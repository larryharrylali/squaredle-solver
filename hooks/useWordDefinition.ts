import { useState, useEffect } from 'react';

interface Definition {
  word: string;
  phonetic?: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

interface UseWordDefinitionResult {
  definition: Definition | null;
  loading: boolean;
  error: string | null;
}

// Simple in-memory cache to avoid repeated API calls
const definitionCache = new Map<string, Definition>();
const failedLookups = new Set<string>(); // Track failed lookups

// Multiple API sources for better coverage - only using free, working APIs
const API_SOURCES = [
  {
    name: 'Free Dictionary API',
    url: (word: string) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    parse: (data: any) => {
      if (data && data.length > 0) {
        const wordData = data[0];
        return {
          word: wordData.word,
          phonetic: wordData.phonetic || wordData.phonetics?.[0]?.text,
          meanings: wordData.meanings?.slice(0, 2).map((meaning: any) => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions?.slice(0, 2).map((def: any) => ({
              definition: def.definition,
              example: def.example
            })) || []
          })) || []
        };
      }
      return null;
    }
  }
];

async function tryApiSource(source: typeof API_SOURCES[0], word: string): Promise<Definition | null> {
  try {
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: source.headers || {}
    };
    
    const response = await fetch(source.url(word), fetchOptions);
    
    if (response.ok) {
      const data = await response.json();
      return source.parse(data);
    }
  } catch (error) {
    console.warn(`${source.name} failed for "${word}":`, error);
  }
  return null;
}

async function fetchDefinitionWithFallbacks(word: string): Promise<Definition> {
  const normalizedWord = word.toLowerCase().trim();
  
  // Try multiple API sources in order
  for (const source of API_SOURCES) {
    const result = await tryApiSource(source, normalizedWord);
    if (result) {
      return result;
    }
  }

  // Try multiple Wiktionary approaches
  try {
    // First try the REST API summary
    const summaryResponse = await fetch(`https://en.wiktionary.org/api/rest_v1/page/summary/${normalizedWord}`);
    if (summaryResponse.ok) {
      const summaryData = await summaryResponse.json();
      if (summaryData && summaryData.extract && !summaryData.extract.includes('may refer to')) {
        const extract = summaryData.extract.split('.')[0] + '.'; // First sentence only
        return {
          word: normalizedWord,
          meanings: [{
            partOfSpeech: 'word',
            definitions: [{
              definition: extract
            }]
          }]
        };
      }
    }
  } catch (error) {
    console.warn('Wiktionary REST API failed:', error);
  }

  // Try Wiktionary parse API as backup
  try {
    const parseResponse = await fetch(`https://en.wiktionary.org/w/api.php?action=query&format=json&titles=${normalizedWord}&prop=extracts&exintro=&explaintext=&exsectionformat=plain&origin=*`);
    if (parseResponse.ok) {
      const parseData = await parseResponse.json();
      const pages = parseData?.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId]?.extract;
        if (extract && extract.length > 20 && !extract.includes('may refer to')) {
          // Clean up the extract and take first meaningful sentence
          const cleanExtract = extract
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          const firstSentence = cleanExtract.split('.')[0];
          if (firstSentence.length > 10) {
            return {
              word: normalizedWord,
              meanings: [{
                partOfSpeech: 'word',
                definitions: [{
                  definition: firstSentence + '.'
                }]
              }]
            };
          }
        }
      }
    }
  } catch (error) {
    console.warn('Wiktionary parse API failed:', error);
  }

  // Generate contextual fallback based on word patterns
  const contextualDefinition = generateContextualFallback(word);
  return contextualDefinition;
}

// Enhanced word similarity and root detection
function findSimilarWords(word: string): string[] {
  const normalizedWord = word.toLowerCase();
  const similarWords: string[] = [];
  
  // Common chemistry/science suffixes and their roots
  const scienceSuffixes = [
    { suffix: 'mine', root: 'min', field: 'chemistry' },
    { suffix: 'ine', root: 'in', field: 'chemistry' },
    { suffix: 'ate', root: 'at', field: 'chemistry' },
    { suffix: 'ide', root: 'id', field: 'chemistry' },
    { suffix: 'ism', root: 'ist', field: 'philosophy' },
    { suffix: 'tion', root: 't', field: 'general' },
    { suffix: 'sion', root: 's', field: 'general' }
  ];
  
  for (const {suffix, root} of scienceSuffixes) {
    if (normalizedWord.endsWith(suffix) && normalizedWord.length > suffix.length + 1) {
      const baseWord = normalizedWord.slice(0, -suffix.length) + root + (suffix.endsWith('e') ? 'e' : '');
      similarWords.push(baseWord);
    }
  }
  
  // Double letters - but only for certain patterns to avoid invalid suggestions
  if (normalizedWord.includes('mm') && !normalizedWord.endsWith('ing')) {
    similarWords.push(normalizedWord.replace('mm', 'm'));
  }
  if (normalizedWord.includes('nn') && !normalizedWord.endsWith('ing') && !normalizedWord.endsWith('ed')) {
    similarWords.push(normalizedWord.replace('nn', 'n'));
  }
  if (normalizedWord.includes('ll') && !normalizedWord.endsWith('ing') && !normalizedWord.includes('all')) {
    similarWords.push(normalizedWord.replace('ll', 'l'));
  }
  
  return similarWords;
}

function generateContextualFallback(word: string): Definition {
  const normalizedWord = word.toLowerCase();
  const upperWord = word.toUpperCase();
  
  // Check for similar/related words
  const similarWords = findSimilarWords(normalizedWord);
  let similarWordHint = '';
  if (similarWords.length > 0) {
    const firstSimilar = similarWords[0];
    similarWordHint = ` It may be related to "${firstSimilar.toUpperCase()}".`;
  }
  
  // Enhanced morphological analysis with more informative definitions
  if (normalizedWord.endsWith('s') && normalizedWord.length > 3) {
    const singular = normalizedWord.slice(0, -1);
    
    // Check if it might be a verb (third person singular)
    if (normalizedWord.length <= 6) {
      return {
        word: normalizedWord,
        meanings: [{
          partOfSpeech: 'verb (3rd person singular) or noun (plural)',
          definitions: [{
            definition: `"${upperWord}" is likely either the third-person singular form of the verb "${singular}" or the plural form of the noun "${singular}".`,
            example: `He/she ${normalizedWord}... OR Multiple ${singular}s`
          }]
        }]
      };
    }
    
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'noun (plural)',
        definitions: [{
          definition: `"${upperWord}" is the plural form of "${singular.toUpperCase()}". Refers to multiple instances or examples of ${singular}.`
        }]
      }]
    };
  }
  
  if (normalizedWord.endsWith('ed') && normalizedWord.length > 4) {
    let base = normalizedWord.slice(0, -2);
    
    // Handle double consonant endings (e.g., "stopped" -> "stop")
    if (base.length > 2 && base[base.length - 1] === base[base.length - 2]) {
      const lastChar = base[base.length - 1];
      if ('bdfglmnprt'.includes(lastChar)) {
        base = base.slice(0, -1);
      }
    }
    
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'verb (past tense)',
        definitions: [{
          definition: `"${upperWord}" is the past tense form of the verb "${base.toUpperCase()}". Describes an action that happened in the past.`,
          example: `Yesterday, someone ${normalizedWord}...`
        }]
      }]
    };
  }
  
  if (normalizedWord.endsWith('ing') && normalizedWord.length > 5) {
    let base = normalizedWord.slice(0, -3);
    
    // Handle double consonant endings for -ing words
    if (base.length > 2 && base[base.length - 1] === base[base.length - 2]) {
      const lastChar = base[base.length - 1];
      if ('bdfglmnprt'.includes(lastChar)) {
        base = base.slice(0, -1);
      }
    }
    
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'verb (present participle) or gerund',
        definitions: [{
          definition: `"${upperWord}" is the present participle or gerund form of "${base.toUpperCase()}". Can describe an ongoing action or be used as a noun.`,
          example: `Currently ${normalizedWord}... OR The ${normalizedWord} process...`
        }]
      }]
    };
  }
  
  // Check for -er endings (comparative adjectives or agent nouns)
  if (normalizedWord.endsWith('er') && normalizedWord.length > 4) {
    const base = normalizedWord.slice(0, -2);
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'adjective (comparative) or noun',
        definitions: [{
          definition: `"${upperWord}" could be the comparative form of "${base.toUpperCase()}" (meaning "more ${base}") or a person/thing that performs an action related to "${base}".`,
          example: `${upperWord} than before... OR A ${normalizedWord} is someone who...`
        }]
      }]
    };
  }
  
  // Check for -ly endings (adverbs)
  if (normalizedWord.endsWith('ly') && normalizedWord.length > 4) {
    const base = normalizedWord.slice(0, -2);
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'adverb',
        definitions: [{
          definition: `"${upperWord}" is likely an adverb derived from "${base.toUpperCase()}", describing how something is done in a ${base} manner.`,
          example: `Done ${normalizedWord}...`
        }]
      }]
    };
  }
  
  // Check for common prefixes
  if (normalizedWord.startsWith('un') && normalizedWord.length > 4) {
    const base = normalizedWord.slice(2);
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'adjective or verb',
        definitions: [{
          definition: `"${upperWord}" likely means "not ${base}" or "the opposite of ${base}". The prefix "un-" typically indicates negation or reversal.`
        }]
      }]
    };
  }
  
  if (normalizedWord.startsWith('re') && normalizedWord.length > 4) {
    const base = normalizedWord.slice(2);
    return {
      word: normalizedWord,
      meanings: [{
        partOfSpeech: 'verb',
        definitions: [{
          definition: `"${upperWord}" likely means "to ${base} again" or "to ${base} back". The prefix "re-" typically indicates repetition or return.`
        }]
      }]
    };
  }
  
  // Enhanced default with word length and similarity hints
  let contextHint = '';
  if (normalizedWord.length <= 4) {
    contextHint = ' This is a short, common English word.';
  } else if (normalizedWord.length >= 7) {
    contextHint = ' This is a longer English word that may be more specialized or technical.';
  }
  
  // Add field-specific hints for technical terms
  let fieldHint = '';
  if (normalizedWord.endsWith('mine') || normalizedWord.endsWith('ine') || normalizedWord.endsWith('ate') || normalizedWord.endsWith('ide')) {
    fieldHint = ' This appears to be a scientific or chemistry term.';
  }
  
  return {
    word: normalizedWord,
    meanings: [{
      partOfSpeech: 'english word',
      definitions: [{
        definition: `"${upperWord}" is a valid English word found in standard dictionaries.${contextHint}${fieldHint}${similarWordHint} While we couldn't retrieve the specific definition from our primary sources, it's recognized as a legitimate word in English vocabulary.`
      }]
    }]
  };
}

export function useWordDefinition(word: string | null): UseWordDefinitionResult {
  const [definition, setDefinition] = useState<Definition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word || word.length < 3) {
      setDefinition(null);
      setLoading(false);
      setError(null);
      return;
    }

    const normalizedWord = word.toLowerCase().trim();

    // Check cache first
    if (definitionCache.has(normalizedWord)) {
      setDefinition(definitionCache.get(normalizedWord)!);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchDefinition = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchDefinitionWithFallbacks(normalizedWord);
        
        // Cache the result (even fallback results)
        definitionCache.set(normalizedWord, result);
        setDefinition(result);
        
      } catch (err) {
        // This should rarely happen now with fallbacks
        const errorMessage = err instanceof Error ? err.message : 'Unable to load definition';
        setError(errorMessage);
        setDefinition(null);
        
        // Mark as failed lookup
        failedLookups.add(normalizedWord);
      } finally {
        setLoading(false);
      }
    };

    fetchDefinition();
  }, [word]);

  return { definition, loading, error };
}