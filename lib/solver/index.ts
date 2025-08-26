import type { SolveResult } from '@/lib/types';
import { DictionaryLoader } from '@/lib/dictionary/loader';
import { SquaredleSolver, validateGrid } from './algorithm';

// This runs in the main thread
export async function solvePuzzle(grid: string[][]): Promise<SolveResult> {
  // Validate grid
  if (!validateGrid(grid)) {
    throw new Error('Invalid grid format');
  }

  // For now, always use main thread to avoid Web Worker issues
  return await solveInMainThread(grid);

  // TODO: Re-enable Web Worker later
  // Check if Web Worker is available
  // if (typeof Worker !== 'undefined') {
  //   try {
  //     return await solveWithWorker(grid);
  //   } catch (error) {
  //     console.warn('Web Worker failed, falling back to main thread:', error);
  //     return await solveInMainThread(grid);
  //   }
  // } else {
  //   // Fallback for environments without Web Worker support
  //   return await solveInMainThread(grid);
  // }
}

async function solveWithWorker(grid: string[][]): Promise<SolveResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./solver.worker.ts', import.meta.url));
    
    // Set timeout for worker
    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error('Solver timeout'));
    }, 10000); // 10 second timeout

    worker.onmessage = (event) => {
      clearTimeout(timeout);
      worker.terminate();
      
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        resolve(event.data.result);
      }
    };

    worker.onerror = (error) => {
      clearTimeout(timeout);
      worker.terminate();
      reject(error);
    };

    // Send grid to worker
    worker.postMessage({ grid });
  });
}

async function solveInMainThread(grid: string[][]): Promise<SolveResult> {
  // Load dictionary
  const loader = DictionaryLoader.getInstance();
  const trie = await loader.loadDictionary();
  
  // Solve
  const solver = new SquaredleSolver(trie, grid);
  return solver.solve();
}

// Export a function to preload the dictionary
export async function preloadDictionary(): Promise<void> {
  const loader = DictionaryLoader.getInstance();
  await loader.loadDictionary();
}