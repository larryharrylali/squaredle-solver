'use client';

import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { SolveResult } from '@/lib/types';

interface SolverResultsProps {
  results: SolveResult;
  searchQuery: string;
  onWordClick: (word: string) => void;
  selectedWord: string | null;
}

export default function SolverResults({ 
  results, 
  searchQuery, 
  onWordClick, 
  selectedWord 
}: SolverResultsProps) {
  // Filter and group words
  const filteredWordsByLength = useMemo(() => {
    const filtered: Record<number, string[]> = {};
    
    Object.entries(results.wordsByLength).forEach(([lengthStr, words]) => {
      const length = parseInt(lengthStr, 10);
      const filteredWords = words.filter(word => 
        searchQuery ? word.toLowerCase().includes(searchQuery.toLowerCase()) : true
      );
      
      if (filteredWords.length > 0) {
        filtered[length] = filteredWords;
      }
    });
    
    return filtered;
  }, [results.wordsByLength, searchQuery]);

  // Sort lengths
  const sortedLengths = useMemo(() => 
    Object.keys(filteredWordsByLength).map(k => parseInt(k, 10)).sort((a, b) => a - b),
    [filteredWordsByLength]
  );

  // Calculate stats
  const totalFiltered = useMemo(() => 
    Object.values(filteredWordsByLength).reduce((sum, words) => sum + words.length, 0),
    [filteredWordsByLength]
  );

  // Color coding by word length
  const getLengthColor = (length: number) => {
    if (length <= 4) return 'text-blue-600 border-blue-200 bg-blue-50';
    if (length <= 6) return 'text-green-600 border-green-200 bg-green-50';
    if (length <= 8) return 'text-yellow-600 border-yellow-200 bg-yellow-50';
    return 'text-purple-600 border-purple-200 bg-purple-50';
  };

  const getWordColor = (length: number) => {
    if (length <= 4) return 'bg-blue-100 hover:bg-blue-200 text-blue-900';
    if (length <= 6) return 'bg-green-100 hover:bg-green-200 text-green-900';
    if (length <= 8) return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-900';
    return 'bg-purple-100 hover:bg-purple-200 text-purple-900';
  };

  if (results.words.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No words found in this grid.</p>
        <p className="text-sm mt-2">Try a different combination of letters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {totalFiltered} of {results.totalWords} words
        </span>
        <span>
          Solved in {results.solveTime}ms
        </span>
      </div>

      {/* Results by Length */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {sortedLengths.map(length => {
          const words = filteredWordsByLength[length] || [];
          
          return (
            <LengthGroup 
              key={length}
              length={length}
              words={words}
              onWordClick={onWordClick}
              selectedWord={selectedWord}
              getLengthColor={getLengthColor}
              getWordColor={getWordColor}
            />
          );
        })}
      </div>

      {/* No results after filtering */}
      {totalFiltered === 0 && searchQuery && (
        <div className="text-center py-4 text-gray-500">
          <p>No words match &quot;{searchQuery}&quot;</p>
        </div>
      )}

      {/* Instructions */}
      <div className="text-sm text-gray-500 pt-3">
        <p>💡 Click any word to see how it connects on the grid</p>
      </div>
    </div>
  );
}

// LengthGroup component to handle individual word length sections
interface LengthGroupProps {
  length: number;
  words: string[];
  onWordClick: (word: string) => void;
  selectedWord: string | null;
  getLengthColor: (length: number) => string;
  getWordColor: (length: number) => string;
}

function LengthGroup({ 
  length, 
  words, 
  onWordClick, 
  selectedWord, 
  getLengthColor, 
  getWordColor 
}: LengthGroupProps) {
  const [isExpanded, setIsExpanded] = useState(length <= 5); // Auto-expand shorter words

  return (
    <div className="rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={clsx(
          'w-full px-4 py-2 flex items-center justify-between transition-colors',
          getLengthColor(length)
        )}
      >
        <span className="font-semibold">
          {length}-letter words ({words.length})
        </span>
        <svg
          className={clsx(
            'w-5 h-5 transition-transform',
            isExpanded ? 'rotate-180' : ''
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="p-3 bg-white">
          <div className="flex flex-wrap gap-2">
            {words.map(word => (
              <button
                key={word}
                onClick={() => onWordClick(word)}
                className={clsx(
                  'px-3 py-1 rounded-md text-sm font-medium transition-all',
                  'hover:scale-105 hover:shadow-md',
                  selectedWord === word
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : '',
                  getWordColor(length)
                )}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}