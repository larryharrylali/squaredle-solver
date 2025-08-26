'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import GridInput from '@/components/GridInput';
import SolverResults from '@/components/SolverResults';
import { solvePuzzle } from '@/lib/solver';
import type { SolveResult } from '@/lib/types';

export default function Home() {
  // Add JSON-LD structured data for better SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How to solve Squaredle puzzle quickly?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Simply enter the letters from your Squaredle grid into our solver and click "Solve". Our lightning-fast algorithm finds all possible words in under 2 seconds, organized by word length.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the best Squaredle solver online?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Our solver combines speed, accuracy, and beauty with visual path animations that show you exactly how each word connects. Optimized for all devices with educational features.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does this Squaredle word finder really work for free?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! Our core solver is 100% free forever. No registration required, no limits on daily use, and no hidden fees.'
          }
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const [grid, setGrid] = useState<string[][]>([]);
  const [results, setResults] = useState<SolveResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSolve = useCallback(async (gridData: string[][]) => {
    setIsLoading(true);
    setResults(null);
    setSelectedWord(null);
    
    try {
      const solveResult = await solvePuzzle(gridData);
      setResults(solveResult);
    } catch (error) {
      console.error('Error solving puzzle:', error);
      alert('Error solving puzzle: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGridChange = (newGrid: string[][]) => {
    // Only clear selected word if the grid actually changed
    const gridChanged = JSON.stringify(grid) !== JSON.stringify(newGrid);
    setGrid(newGrid);
    // Don't automatically clear results - let users keep them while modifying grid
    if (gridChanged) {
      setSelectedWord(null);
    }
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  const handleClearPath = () => {
    setSelectedWord(null);
  };

  const handleClear = () => {
    setResults(null);
    setSelectedWord(null);
  };

  const scrollToGridInput = () => {
    const element = document.getElementById('grid-input');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const selectedWordPath = selectedWord && results?.wordPaths[selectedWord] 
    ? results.wordPaths[selectedWord][0] || [] // Use first path for now
    : [];

  return (
    <>
      {/* Header */}
      <nav className="relative bg-gradient-to-r from-blue-50 via-white to-sky-50 border-b border-sky-200/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Squaredle Solver
              </span>
            </div>
            
            {/* Ad Space - Top Banner - HIDDEN FOR NOW */}
            <div className="hidden">
              <div className="w-728 h-90 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/50 rounded-lg flex items-center justify-center text-sky-600 text-sm">
                {/* Google AdSense - Top Banner (728x90) */}
                <span>Advertisement Space</span>
              </div>
            </div>
            
            {/* Buy Me a Coffee - Header - HIDDEN FOR NOW */}
            <div className="hidden">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium">
                <span>☕</span>
                <span className="hidden sm:inline">Buy Me a Coffee</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Ad Space - HIDDEN FOR NOW */}
          <div className="hidden">
            <div className="w-full h-12 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/50 rounded-lg flex items-center justify-center text-sky-600 text-sm">
              {/* Google AdSense - Mobile Banner (320x50) */}
              <span>Mobile Ad Space</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 hover:from-blue-150 hover:via-sky-150 hover:to-indigo-150 transition-all duration-500 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-sky-300/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-cyan-200/50 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute animate-float-slow top-16 left-1/4 text-3xl">🔤</div>
          <div className="absolute animate-float-slow delay-1000 top-32 right-1/3 text-2xl">📝</div>
          <div className="absolute animate-float-slow delay-2000 bottom-20 left-1/5 text-2xl">💫</div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-sky-50 rounded-3xl mb-8 shadow-xl border border-sky-200 animate-bounce" style={{animationDuration: '3s'}}>
              <span className="text-3xl">🧩</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 bg-clip-text text-transparent mb-4">
              Squaredle Solver
            </h1>
            <h2 className="text-xl sm:text-2xl text-slate-600 font-medium mb-6">
              Solve Today's Squaredle Puzzle in Seconds ⚡
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Find all hidden words with visual paths and learn new vocabulary along the way.
            </p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2 text-slate-700 bg-white px-5 py-3 rounded-full shadow-lg border border-sky-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">100% Free</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 bg-white px-5 py-3 rounded-full shadow-lg border border-sky-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-sm font-semibold">Instant Results</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 bg-white px-5 py-3 rounded-full shadow-lg border border-sky-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="text-sm font-semibold">Educational</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-gradient-to-b from-indigo-100 via-white to-sky-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Grid Input */}
          <div className="space-y-4">
            <div id="grid-input" className="relative bg-gradient-to-br from-white to-sky-25 rounded-2xl shadow-lg border border-sky-200/50 p-6 hover:shadow-xl hover:border-sky-300/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-100/50 rounded-full blur-2xl"></div>
              
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">✏️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">Enter Your Puzzle Grid 🧩</h3>
                  <p className="text-slate-600 text-sm mt-1">Fill in the letters from your Squaredle puzzle</p>
                </div>
              </div>
              <GridInput 
                onGridChange={handleGridChange}
                onSolve={handleSolve}
                onClear={handleClear}
                isLoading={isLoading}
                selectedWordPath={selectedWordPath}
                selectedWord={selectedWord || undefined}
                onClearPath={handleClearPath}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-white to-blue-25 rounded-2xl shadow-lg border border-sky-200/50 p-6 min-h-[400px] hover:shadow-xl hover:border-sky-300/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-blue-100/50 rounded-full blur-2xl"></div>
              
              <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
                      Results ✨
                    </h3>
                  </div>
                </div>
                {results && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="🔍 Search words..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-4 py-2 bg-sky-50 border border-sky-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                )}
              </div>
              
              {isLoading && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-200 border-t-sky-500 mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🔍</span>
                      </div>
                    </div>
                    <p className="mt-4 text-slate-700 font-medium">Finding words...</p>
                    <p className="text-slate-500 mt-1">Searching through thousands of possibilities</p>
                  </div>
                </div>
              )}
              
              {results && !isLoading && (
                <SolverResults 
                  results={results}
                  searchQuery={searchQuery}
                  onWordClick={handleWordClick}
                  selectedWord={selectedWord}
                />
              )}
              
              {!results && !isLoading && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-sky-200">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <p className="text-slate-700 font-medium">Ready to solve your puzzle?</p>
                    <p className="text-slate-500 mt-1">Enter letters and click Solve to find all words</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </main>

      {/* Mid-Content Ad Space - HIDDEN FOR NOW */}
      <div className="hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-32 bg-white/80 border border-sky-200/50 rounded-lg flex items-center justify-center text-sky-600 text-sm shadow-sm">
            {/* Google AdSense - Mid-Content Rectangle (728x90 or 300x250) */}
            <span>Mid-Content Advertisement Space</span>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="relative bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100 py-20 hover:from-sky-150 hover:via-blue-150 hover:to-cyan-150 transition-all duration-500 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-sky-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute animate-float-slow top-32 left-1/4 text-4xl text-sky-400">🎆</div>
          <div className="absolute animate-float-slow delay-1000 bottom-32 right-1/4 text-3xl text-blue-400">✨</div>
          <div className="absolute animate-float-slow delay-2000 top-1/2 right-1/3 text-3xl text-cyan-400">🚀</div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-6">
              Why Players Love Our Solver ❤️
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Discover what makes our Squaredle solver the most loved tool among puzzle enthusiasts worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-100/50 rounded-full blur-xl group-hover:bg-sky-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">INSTANT RESULTS</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get every word in your puzzle within seconds using our lightning-fast algorithm
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-100/50 rounded-full blur-xl group-hover:bg-emerald-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors duration-300">NEVER MISS A WORD</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our comprehensive algorithm finds even the most obscure bonus words you'd never think of
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100/50 rounded-full blur-xl group-hover:bg-blue-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">👁️</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">VISUAL LEARNING</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Click any word to see beautiful animated paths showing exactly how letters connect
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-100/50 rounded-full blur-xl group-hover:bg-indigo-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors duration-300">WORKS EVERYWHERE</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Perfectly optimized for phones, tablets, and desktop with responsive design
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-100/50 rounded-full blur-xl group-hover:bg-cyan-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">💾</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors duration-300">SMART MEMORY</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically saves your puzzle grid as you type, never lose your progress
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100/50 rounded-full blur-xl group-hover:bg-green-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-green-700 transition-colors duration-300">ALWAYS FREE</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                No hidden fees, no accounts needed, no limits. Just pure puzzle solving joy
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-100/50 rounded-full blur-xl group-hover:bg-rose-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-rose-700 transition-colors duration-300">EDUCATIONAL</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hover over any word to see definitions and expand your vocabulary while playing
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-sky-25 p-6 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl hover:border-sky-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center overflow-hidden relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100/50 rounded-full blur-xl group-hover:bg-purple-200/50 transition-colors duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors duration-300">COMPREHENSIVE</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Advanced algorithm discovers obscure bonus words that other solvers miss
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={scrollToGridInput}
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <span className="text-2xl group-hover:animate-bounce">🚀</span>
              <span className="font-bold">Ready to solve today's puzzle?</span>
              <span className="text-2xl group-hover:animate-pulse">✨</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-gradient-to-br from-indigo-200 via-blue-200 to-slate-200 py-20 hover:from-indigo-250 hover:via-blue-250 hover:to-slate-250 transition-all duration-500 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-sky-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <div className="absolute animate-float-slow top-24 right-1/4 text-3xl text-sky-400">💭</div>
          <div className="absolute animate-float-slow delay-1000 bottom-24 left-1/4 text-3xl text-blue-400">❓</div>
          <div className="absolute animate-float-slow delay-2000 top-1/2 right-1/3 text-2xl text-cyan-400">💡</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent mb-6">
              💬 Questions & Answers
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about our Squaredle solver
            </p>
          </div>
          
          <div className="space-y-6">
            <details className="group bg-white/90 backdrop-blur-sm p-6 hover:bg-white cursor-pointer rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              <summary className="font-bold text-slate-800 text-lg flex items-center gap-4 group-hover:text-blue-700 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">❓</span>
                <span>How to solve Squaredle puzzle quickly?</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed pl-10">
                Simply enter the letters from your Squaredle grid into our solver and click "Solve". 
                Our lightning-fast algorithm finds all possible words in under 2 seconds, organized by word length.
              </p>
            </details>
            
            <details className="group bg-white/90 backdrop-blur-sm p-6 hover:bg-white cursor-pointer rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              <summary className="font-bold text-slate-800 text-lg flex items-center gap-4 group-hover:text-blue-700 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">🏆</span>
                <span>What is the best Squaredle solver online?</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed pl-10">
                Our solver combines speed, accuracy, and beauty with visual path animations that show you 
                exactly how each word connects. Optimized for all devices with educational features.
              </p>
            </details>
            
            <details className="group bg-white/90 backdrop-blur-sm p-6 hover:bg-white cursor-pointer rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              <summary className="font-bold text-slate-800 text-lg flex items-center gap-4 group-hover:text-blue-700 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">💎</span>
                <span>Does this Squaredle word finder really work for free?</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed pl-10">
                Yes! Our core solver is 100% free forever. No registration required, no limits on daily use, 
                and no hidden fees. Just pure puzzle-solving joy whenever you need it.
              </p>
            </details>
            
            <details className="group bg-white/90 backdrop-blur-sm p-6 hover:bg-white cursor-pointer rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              <summary className="font-bold text-slate-800 text-lg flex items-center gap-4 group-hover:text-blue-700 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">📱</span>
                <span>Can I use this mobile Squaredle solver on my phone?</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed pl-10">
                Absolutely! Our solver is optimized for mobile devices with large, comfortable touch targets and 
                responsive design. It works perfectly on iPhones, Android phones, and tablets.
              </p>
            </details>
            
            <details className="group bg-white/90 backdrop-blur-sm p-6 hover:bg-white cursor-pointer rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              <summary className="font-bold text-slate-800 text-lg flex items-center gap-4 group-hover:text-blue-700 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">🎯</span>
                <span>How accurate is this Squaredle cheat tool?</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed pl-10">
                Our solver uses a comprehensive word database to discover every valid word in your puzzle, 
                including bonus words that other solvers might miss.
              </p>
            </details>
            
            <details className="group bg-white/90 backdrop-blur-sm p-6 hover:bg-white cursor-pointer rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              <summary className="font-bold text-slate-800 text-lg flex items-center gap-4 group-hover:text-blue-700 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">📚</span>
                <span>Can this Squaredle solver help me learn new words?</span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed pl-10">
                Absolutely! Our educational solver shows word definitions when you hover over any word. 
                This helps you expand vocabulary and learn word meanings while solving puzzles, 
                making it perfect for both entertainment and education.
              </p>
            </details>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={scrollToGridInput}
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <span className="text-2xl group-hover:animate-spin">🧠</span>
              <span className="font-bold">Still have questions? Just start solving!</span>
              <span className="text-2xl group-hover:animate-pulse">✨</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 border-t border-sky-200/50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bottom Banner Ad Space - HIDDEN FOR NOW */}
          <div className="hidden">
            <div className="w-full max-w-4xl mx-auto h-24 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/50 rounded-lg flex items-center justify-center text-sky-600 text-sm">
              {/* Google AdSense - Bottom Banner (728x90) */}
              <span>Bottom Advertisement Space</span>
            </div>
          </div>
          
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Support Section - HIDDEN FOR NOW */}
            <div className="hidden">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                💝 Support This Project
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                Help keep Squaredle Solver free and ad-light by supporting our development!
              </p>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <span className="text-lg">☕</span>
                <span>Buy Me a Coffee</span>
              </button>
            </div>
            
            {/* Placeholder for Support Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                🚀 More Features Coming
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                We're constantly improving Squaredle Solver with new features and enhancements!
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-6 py-3 rounded-lg shadow-lg font-semibold">
                <span className="text-lg">✨</span>
                <span>Stay Tuned</span>
              </div>
            </div>
            
            {/* Links Section */}
            <div className="text-center">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                🔗 Quick Links
              </h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-slate-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-slate-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Terms of Service
                </Link>
                <Link href="/contact" className="block text-slate-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Contact Us
                </Link>
                <Link href="/about" className="block text-slate-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  About Squaredle
                </Link>
              </div>
            </div>
            
            {/* Info Section */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                ℹ️ About
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Free, fast, and educational Squaredle puzzle solver. 
                Find all words instantly with beautiful visual paths and learn new vocabulary.
              </p>
              <div className="mt-4 flex justify-center md:justify-end space-x-4">
                <div className="flex items-center text-slate-500 text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  100% Free
                </div>
                <div className="flex items-center text-slate-500 text-xs">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  No Registration
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-sky-200/50 text-center">
            <p className="text-slate-500 text-xs">
              © 2025 Squaredle Solver. Made with ❤️ for puzzle enthusiasts worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buy Me a Coffee Button - HIDDEN FOR NOW */}
      <div className="hidden">
        <button className="group bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
          <span className="text-2xl group-hover:animate-bounce">☕</span>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Buy me a coffee ☕
          </div>
        </button>
      </div>
    </>
  );
}