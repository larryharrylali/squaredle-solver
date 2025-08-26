'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { clsx } from 'clsx';
import WordTooltip from './WordTooltip';

interface GridInputProps {
  onGridChange: (grid: string[][]) => void;
  onSolve: (grid: string[][]) => void;
  onClear?: () => void;
  isLoading: boolean;
  selectedWordPath?: { row: number; col: number }[];
  selectedWord?: string;
  onClearPath?: () => void;
}

const GRID_SIZE = 4; // Default to 4x4, can be made dynamic
const EXAMPLE_GRIDS_4x4 = [
  ['S', 'Q', 'U', 'A', 'R', 'E', 'D', 'L', 'E', 'D', 'L', 'E', 'S', 'O', 'L', 'V'],
  ['T', 'E', 'S', 'T', 'I', 'N', 'G', 'S', 'W', 'O', 'R', 'D', 'P', 'L', 'A', 'Y'],
  ['B', 'R', 'A', 'I', 'N', 'S', 'T', 'O', 'R', 'M', 'I', 'N', 'G', 'A', 'M', 'E'],
];

const EXAMPLE_GRIDS_5x5 = [
  ['P', 'L', 'A', 'N', 'T', 'O', 'U', 'T', 'S', 'I', 'G', 'H', 'T', 'E', 'D', 'R', 'O', 'P', 'S', 'A', 'I', 'D', 'E', 'R', 'S'],
  ['S', 'T', 'A', 'R', 'T', 'H', 'I', 'N', 'K', 'S', 'P', 'A', 'C', 'E', 'D', 'L', 'I', 'G', 'H', 'T', 'S', 'O', 'U', 'N', 'D'],
  ['G', 'R', 'O', 'W', 'N', 'F', 'L', 'O', 'W', 'E', 'R', 'S', 'H', 'A', 'P', 'E', 'D', 'W', 'O', 'R', 'D', 'S', 'A', 'I', 'L'],
];

export default function GridInput({ onGridChange, onSolve, onClear, isLoading, selectedWordPath = [], selectedWord, onClearPath }: GridInputProps) {
  console.log('🎯 GridInput received:', { selectedWord, selectedWordPath: selectedWordPath.length });
  
  const [gridSize, setGridSize] = useState(GRID_SIZE);
  const [grid, setGrid] = useState<string[][]>(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  );
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isWordHovered, setIsWordHovered] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  // Hydration effect - load from localStorage after mount
  useEffect(() => {
    setIsHydrated(true);
    
    // Load saved grid size
    let newSize = GRID_SIZE;
    const savedSize = localStorage.getItem('squaredle-grid-size');
    if (savedSize) {
      const size = parseInt(savedSize, 10);
      if (size === 4 || size === 5) {
        newSize = size;
        setGridSize(size);
      }
    }
    
    // Load saved grid data
    const savedGrid = localStorage.getItem('squaredle-grid-data');
    if (savedGrid) {
      try {
        const parsed = JSON.parse(savedGrid);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setGrid(parsed);
          return;
        }
      } catch {
        // Invalid data, ignore
      }
    }
    
    // If no valid saved data, create empty grid with current size
    setGrid(Array(newSize).fill(null).map(() => Array(newSize).fill('')));
  }, []);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  }, [gridSize]);

  // Save grid data to localStorage (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('squaredle-grid-data', JSON.stringify(grid));
    }
  }, [grid, isHydrated]);

  // Save grid size to localStorage (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('squaredle-grid-size', gridSize.toString());
    }
  }, [gridSize, isHydrated]);

  // Update parent when grid changes
  useEffect(() => {
    onGridChange(grid);
  }, [grid, onGridChange]);

  const handleCellChange = (row: number, col: number, value: string) => {
    // Only accept letters
    const letter = value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 1);
    
    const newGrid = [...grid];
    newGrid[row][col] = letter;
    setGrid(newGrid);

    // Auto-advance to next cell if a letter was entered
    if (letter && col < gridSize - 1) {
      inputRefs.current[row][col + 1]?.focus();
    } else if (letter && col === gridSize - 1 && row < gridSize - 1) {
      inputRefs.current[row + 1][0]?.focus();
    }
  };

  const handleKeyDown = (row: number, col: number, e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    
    // Navigation with arrow keys
    if (key === 'ArrowRight' && col < gridSize - 1) {
      e.preventDefault();
      inputRefs.current[row][col + 1]?.focus();
    } else if (key === 'ArrowLeft' && col > 0) {
      e.preventDefault();
      inputRefs.current[row][col - 1]?.focus();
    } else if (key === 'ArrowDown' && row < gridSize - 1) {
      e.preventDefault();
      inputRefs.current[row + 1][col]?.focus();
    } else if (key === 'ArrowUp' && row > 0) {
      e.preventDefault();
      inputRefs.current[row - 1][col]?.focus();
    } else if (key === 'Backspace' && !grid[row][col] && (col > 0 || row > 0)) {
      // Move to previous cell on backspace if current cell is empty
      e.preventDefault();
      if (col > 0) {
        inputRefs.current[row][col - 1]?.focus();
      } else if (row > 0) {
        inputRefs.current[row - 1][gridSize - 1]?.focus();
      }
    } else if (key === 'Tab') {
      // Prevent default tab behavior within grid
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: go to previous cell
        if (col > 0) {
          inputRefs.current[row][col - 1]?.focus();
        } else if (row > 0) {
          inputRefs.current[row - 1][gridSize - 1]?.focus();
        }
      } else {
        // Tab: go to next cell
        if (col < gridSize - 1) {
          inputRefs.current[row][col + 1]?.focus();
        } else if (row < gridSize - 1) {
          inputRefs.current[row + 1][0]?.focus();
        }
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').toUpperCase();
    
    // Smart parsing: handle various formats
    // Remove common separators and whitespace
    const cleanedText = pastedText
      .replace(/[\s\-,\.\n\r]/g, '')
      .replace(/[^A-Z]/g, '');
    
    if (cleanedText.length >= gridSize * gridSize) {
      // Fill the entire grid
      const newGrid = Array(gridSize).fill(null).map((_, row) =>
        Array(gridSize).fill(null).map((_, col) => 
          cleanedText[row * gridSize + col] || ''
        )
      );
      setGrid(newGrid);
    } else {
      // Partial paste - fill from current position
      const startRow = focusedCell?.row || 0;
      const startCol = focusedCell?.col || 0;
      
      const newGrid = [...grid];
      let charIndex = 0;
      
      for (let row = startRow; row < gridSize && charIndex < cleanedText.length; row++) {
        for (let col = (row === startRow ? startCol : 0); col < gridSize && charIndex < cleanedText.length; col++) {
          newGrid[row][col] = cleanedText[charIndex++];
        }
      }
      
      setGrid(newGrid);
    }
  };

  const handleClear = () => {
    setGrid(Array(gridSize).fill(null).map(() => Array(gridSize).fill('')));
    onClear?.(); // Clear results and path visualization in parent
    inputRefs.current[0][0]?.focus();
  };

  const handleRandomExample = () => {
    const exampleGrids = gridSize === 4 ? EXAMPLE_GRIDS_4x4 : EXAMPLE_GRIDS_5x5;
    const randomGrid = exampleGrids[Math.floor(Math.random() * exampleGrids.length)];
    const newGrid = Array(gridSize).fill(null).map((_, row) =>
      Array(gridSize).fill(null).map((_, col) => 
        randomGrid[row * gridSize + col] || ''
      )
    );
    setGrid(newGrid);
  };

  const handleSolve = () => {
    // Validate grid has all cells filled
    const isComplete = grid.every(row => row.every(cell => cell));
    if (!isComplete) {
      alert('Please fill in all cells before solving');
      return;
    }
    onSolve(grid);
  };

  const isGridValid = grid.every(row => row.every(cell => cell));

  return (
    <div className="space-y-4">
      {/* Grid Size Selector */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <label className="text-sm font-medium">Grid Size:</label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setGridSize(4);
              setGrid(Array(4).fill(null).map(() => Array(4).fill('')));
            }}
            className={clsx(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              gridSize === 4
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            4×4
          </button>
          <button
            onClick={() => {
              setGridSize(5);
              setGrid(Array(5).fill(null).map(() => Array(5).fill('')));
            }}
            className={clsx(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              gridSize === 5
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            5×5
          </button>
        </div>
      </div>

      {/* Grid Input */}
      <div className="flex justify-center">
        <div className="relative inline-block">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gap: '4px',
              maxWidth: `${gridSize * 64}px`,
            }}
          >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isInPath = selectedWordPath.some(pos => pos.row === rowIndex && pos.col === colIndex);
            
            return (
              <div key={`${rowIndex}-${colIndex}`} className="relative">
                <input
                  ref={(el) => {
                    if (!inputRefs.current[rowIndex]) {
                      inputRefs.current[rowIndex] = [];
                    }
                    inputRefs.current[rowIndex][colIndex] = el;
                  }}
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
                  onPaste={handlePaste}
                  onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
                  className={clsx(
                    'w-[60px] h-[60px] text-center text-2xl font-bold uppercase',
                    'border-2 rounded-md transition-all duration-500',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    cell ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200',
                    'hover:border-gray-400',
                    isInPath && 'bg-blue-100 border-blue-400 text-blue-900 shadow-lg transform scale-105'
                  )}
                  maxLength={1}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  inputMode="text"
                />
              </div>
            );
          })
        )}
          </div>
          
          {/* SVG Path Lines */}
        {selectedWordPath.length > 1 && (
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              width: `${gridSize * 64}px`,
              height: `${gridSize * 64}px`,
            }}
          >
            {selectedWordPath.slice(0, -1).map((pos, index) => {
              const currentPos = pos;
              const nextPos = selectedWordPath[index + 1];
              
              // Calculate center points of cells (accounting for gap)
              const cellSize = 60;
              const gap = 4;
              const startX = currentPos.col * (cellSize + gap) + cellSize / 2;
              const startY = currentPos.row * (cellSize + gap) + cellSize / 2;
              const endX = nextPos.col * (cellSize + gap) + cellSize / 2;
              const endY = nextPos.row * (cellSize + gap) + cellSize / 2;
              
              return (
                <line
                  key={`${index}-${currentPos.row}-${currentPos.col}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                  }}
                />
              );
            })}
            
            {/* Path dots for start and end points */}
            {selectedWordPath.map((pos, index) => {
              const cellSize = 60;
              const gap = 4;
              const centerX = pos.col * (cellSize + gap) + cellSize / 2;
              const centerY = pos.row * (cellSize + gap) + cellSize / 2;
              
              return (
                <circle
                  key={`dot-${index}`}
                  cx={centerX}
                  cy={centerY}
                  r={index === 0 ? "6" : index === selectedWordPath.length - 1 ? "6" : "4"}
                  fill={index === 0 ? "#10b981" : index === selectedWordPath.length - 1 ? "#ef4444" : "#3b82f6"}
                  className="animate-pulse"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                  }}
                />
              );
            })}
          </svg>
          )}
        </div>
      </div>

      {/* Selected Word Display */}
      {selectedWord && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-center">
            <WordTooltip word={selectedWord} isVisible={isWordHovered}>
              <div 
                className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200 shadow-sm cursor-help hover:shadow-md hover:scale-105 transition-all duration-200"
                onMouseEnter={() => setIsWordHovered(true)}
                onMouseLeave={() => setIsWordHovered(false)}
              >
                <span className="text-blue-700 text-sm font-medium">Path:</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                  {selectedWord}
                </span>
                <button
                  onClick={onClearPath}
                  className="text-blue-400 hover:text-blue-600 text-xs ml-1 p-1 rounded-full hover:bg-blue-100 transition-colors"
                  title="Clear Path"
                >
                  ✕
                </button>
              </div>
            </WordTooltip>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button
          onClick={handleSolve}
          disabled={!isGridValid || isLoading}
          className={clsx(
            'px-6 py-2 rounded-lg font-semibold transition-all transform',
            'flex items-center gap-2',
            isGridValid && !isLoading
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          )}
        >
          <span>🧩</span>
          {isLoading ? 'Solving...' : 'Solve'}
        </button>
        
        <button
          onClick={handleClear}
          className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all transform hover:scale-105 flex items-center gap-2 shadow-sm"
        >
          <span>🗑️</span>
          Clear
        </button>
        
        <button
          onClick={handleRandomExample}
          className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all transform hover:scale-105 flex items-center gap-2 shadow-sm"
        >
          <span>🎲</span>
          Example
        </button>
      </div>

      {/* Tips Section */}
      <div className="text-sm text-gray-500 text-center mt-4 space-y-1">
        <p>
          💡 Get today&apos;s puzzle from{' '}
          <a 
            href="https://squaredle.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sky-600 underline hover:text-sky-700"
          >
            squaredle.app
          </a>
          {' '}and paste it here!
        </p>
        <p>Supported formats: &quot;ABCD EFGH&quot;, &quot;ABCD-EFGH&quot;, or just &quot;ABCDEFGH&quot;</p>
        <p>📚 Click any word to see its path, hover for definition!</p>
      </div>
    </div>
  );
}