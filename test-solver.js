// Simple Node.js test to verify the solver logic works
// Run with: node test-solver.js

// Simple trie implementation for testing
class SimpleTrie {
  constructor() {
    this.root = { children: new Map(), isWord: false };
  }

  insert(word) {
    let node = this.root;
    for (const char of word.toUpperCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, { children: new Map(), isWord: false });
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }

  getRoot() {
    return this.root;
  }
}

// Simple solver implementation
class TestSolver {
  constructor(trie, grid) {
    this.trie = trie;
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
    this.words = new Set();
  }

  solve() {
    const startTime = Date.now();
    
    // DFS from each cell
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.dfs(row, col, '', new Set(), this.trie.getRoot());
      }
    }

    const words = Array.from(this.words).sort();
    const endTime = Date.now();
    
    return {
      words,
      totalWords: words.length,
      solveTime: endTime - startTime
    };
  }

  dfs(row, col, currentWord, visitedCells, trieNode) {
    // Boundary check
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return;
    }

    // Check if cell is already visited
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

    // If this forms a valid word (4+ letters)
    if (nextNode.isWord && newWord.length >= 4) {
      this.words.add(newWord);
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
      this.dfs(row + dr, col + dc, newWord, newVisited, nextNode);
    }
  }
}

// Test with a simple grid
const testWords = ['TEST', 'BEST', 'NEST', 'REST', 'WEST', 'TESTS', 'HELLO', 'WORLD'];
const trie = new SimpleTrie();
testWords.forEach(word => trie.insert(word));

const grid = [
  ['T', 'E', 'S', 'T'],
  ['B', 'E', 'S', 'T'],
  ['N', 'E', 'S', 'T'],
  ['R', 'E', 'S', 'T']
];

const solver = new TestSolver(trie, grid);
const result = solver.solve();

console.log('Test Results:');
console.log('Words found:', result.words);
console.log('Total words:', result.totalWords);
console.log('Solve time:', result.solveTime + 'ms');