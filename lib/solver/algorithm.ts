import type { Position, SolveResult } from '@/lib/types';
import { Trie } from '@/lib/dictionary/trie';

export class SquaredleSolver {
  private trie: Trie;
  private grid: string[][];
  private rows: number;
  private cols: number;
  private words: Set<string>;
  private wordPaths: Map<string, Position[][]>;
  private visited: Set<string>;

  constructor(trie: Trie, grid: string[][]) {
    this.trie = trie;
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0]?.length || 0;
    this.words = new Set();
    this.wordPaths = new Map();
    this.visited = new Set();
  }

  solve(): SolveResult {
    const startTime = performance.now();
    
    // DFS from each cell
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.dfs(row, col, '', new Set(), [], this.trie.getRoot());
      }
    }

    // Group words by length
    const wordsByLength: Record<number, string[]> = {};
    const sortedWords = Array.from(this.words).sort();
    
    for (const word of sortedWords) {
      const length = word.length;
      if (!wordsByLength[length]) {
        wordsByLength[length] = [];
      }
      wordsByLength[length].push(word);
    }

    // Convert word paths map to record
    const wordPathsRecord: Record<string, Position[][]> = {};
    this.wordPaths.forEach((paths, word) => {
      wordPathsRecord[word] = paths;
    });

    const endTime = performance.now();
    
    return {
      words: sortedWords,
      wordsByLength,
      wordPaths: wordPathsRecord,
      totalWords: sortedWords.length,
      solveTime: Math.round(endTime - startTime),
    };
  }

  private dfs(
    row: number,
    col: number,
    currentWord: string,
    visitedCells: Set<string>,
    currentPath: Position[],
    trieNode: import('@/lib/types').DictionaryNode
  ): void {
    // Boundary check
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return;
    }

    // Check if cell is already visited in this path
    const cellKey = `${row},${col}`;
    if (visitedCells.has(cellKey)) {
      return;
    }

    // Get current letter
    const letter = this.grid[row][col];
    const newWord = currentWord + letter;

    // Check if this prefix exists in trie
    if (!trieNode || !trieNode.children || !trieNode.children.has(letter)) {
      return;
    }

    const nextNode = trieNode.children.get(letter);
    if (!nextNode) {
      return;
    }
    
    const newPath = [...currentPath, { row, col }];

    // If this forms a valid word (4+ letters)
    if (nextNode.isWord && newWord.length >= 4) {
      if (!this.words.has(newWord)) {
        this.words.add(newWord);
        this.wordPaths.set(newWord, [newPath]);
      } else {
        // Add alternative path for the same word
        const existingPaths = this.wordPaths.get(newWord)!;
        // Limit to 3 paths per word to avoid memory issues
        if (existingPaths.length < 3) {
          existingPaths.push(newPath);
        }
      }
    }

    // Mark cell as visited for this path
    const newVisited = new Set(visitedCells);
    newVisited.add(cellKey);

    // Explore all 8 directions
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
    ];

    for (const [dr, dc] of directions) {
      this.dfs(
        row + dr,
        col + dc,
        newWord,
        newVisited,
        newPath,
        nextNode
      );
    }
  }
}

// Helper function to validate grid
export function validateGrid(grid: string[][]): boolean {
  if (!grid || grid.length === 0) {
    return false;
  }

  const cols = grid[0].length;

  // Check if grid is rectangular and all cells are filled
  for (const row of grid) {
    if (row.length !== cols) {
      return false;
    }
    for (const cell of row) {
      if (!cell || typeof cell !== 'string' || cell.length !== 1) {
        return false;
      }
    }
  }

  return true;
}