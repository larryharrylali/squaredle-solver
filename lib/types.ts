export interface Position {
  row: number;
  col: number;
}

export interface WordPath {
  word: string;
  path: Position[];
}

export interface SolveResult {
  words: string[];
  wordsByLength: Record<number, string[]>;
  wordPaths: Record<string, Position[][]>;
  totalWords: number;
  solveTime: number;
}

export interface GridState {
  size: number;
  cells: string[][];
}

export interface DictionaryNode {
  isWord: boolean;
  children: Map<string, DictionaryNode>;
}