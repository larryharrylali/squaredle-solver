'use client';

import { useWordDefinition } from '@/hooks/useWordDefinition';

interface WordTooltipProps {
  word: string;
  isVisible: boolean;
  children: React.ReactNode;
}

export default function WordTooltip({ word, isVisible, children }: WordTooltipProps) {
  const { definition, loading, error } = useWordDefinition(isVisible ? word : null);

  return (
    <div className="relative inline-block">
      {children}
      
      {/* Tooltip */}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm w-80 sm:w-64">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-200"></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-white mt-[-1px]"></div>
            
            {loading && (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading definition...</span>
              </div>
            )}

            {error && (
              <div className="text-gray-500 text-sm">
                <div className="font-semibold text-gray-700 mb-1">{word.toUpperCase()}</div>
                <div className="italic">Definition not available</div>
              </div>
            )}

            {definition && !loading && !error && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800 text-base">{definition.word.toUpperCase()}</span>
                  {definition.phonetic && (
                    <span className="text-gray-500 text-sm italic">{definition.phonetic}</span>
                  )}
                </div>

                <div className="space-y-2">
                  {definition.meanings.map((meaning, index) => (
                    <div key={index}>
                      <div className="text-blue-600 text-sm font-medium mb-1">
                        {meaning.partOfSpeech}
                      </div>
                      {meaning.definitions.map((def, defIndex) => (
                        <div key={defIndex} className="mb-2">
                          <div className="text-gray-700 text-sm leading-relaxed">
                            {def.definition}
                          </div>
                          {def.example && (
                            <div className="text-gray-500 text-xs italic mt-1">
                              "{def.example}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  {/* If this looks like a fallback definition, add helpful links */}
                  {(definition.meanings[0]?.definitions[0]?.definition.includes('recognized by comprehensive dictionaries') || 
                    definition.meanings[0]?.definitions[0]?.definition.includes('found in standard dictionaries')) && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        <span>Search elsewhere: </span>
                        <a 
                          href={`https://www.dictionary.com/browse/${definition.word}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          Dictionary.com
                        </a>
                        {' • '}
                        <a 
                          href={`https://en.wiktionary.org/wiki/${definition.word}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 underline"
                        >
                          Wiktionary
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}