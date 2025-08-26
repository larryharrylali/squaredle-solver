'use client';

import Link from 'next/link';

export default function AboutSquaredle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-blue-50 via-white to-sky-50 border-b border-sky-200/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Squaredle Solver
              </span>
            </Link>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm font-medium"
            >
              ← Back to Solver
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-sky-200/50 p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
            🧩 About Squaredle
          </h1>

          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">What is Squaredle?</h2>
            <p className="text-slate-600 mb-6">
              Squaredle is a popular daily word puzzle game that challenges players to find all possible words 
              in a grid of letters. Similar to word search puzzles, but with a twist - you can move in any 
              direction (horizontally, vertically, and diagonally) and use each letter multiple times!
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">How to Play Squaredle</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-800 mb-3">Basic Rules:</h3>
              <ul className="text-slate-700 space-y-2">
                <li>• <strong>Find words:</strong> Connect adjacent letters to form valid words</li>
                <li>• <strong>Any direction:</strong> Move horizontally, vertically, or diagonally</li>
                <li>• <strong>Reuse letters:</strong> Each letter can be used in multiple words</li>
                <li>• <strong>Minimum length:</strong> Words must be at least 4 letters long</li>
                <li>• <strong>No repeating:</strong> Don't use the same letter position twice in one word</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Scoring System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">🎯 Required Words</h3>
                <p className="text-green-700 text-sm">
                  These are the minimum words you need to find to complete the puzzle. Usually longer, common words.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">⭐ Bonus Words</h3>
                <p className="text-amber-700 text-sm">
                  Extra words that give you bonus points. These can be shorter or more obscure words.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Strategy Tips</h2>
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mb-6">
              <ul className="text-slate-700 space-y-2">
                <li>• <strong>Start with longer words:</strong> Look for 6+ letter words first</li>
                <li>• <strong>Common prefixes/suffixes:</strong> Words ending in -ING, -ED, -ER are common</li>
                <li>• <strong>Use all directions:</strong> Don't just look horizontally and vertically</li>
                <li>• <strong>Think creatively:</strong> Some valid words might surprise you</li>
                <li>• <strong>Check plurals:</strong> If you find a noun, try adding 'S'</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Why Use Our Solver?</h2>
            <p className="text-slate-600 mb-4">
              Our Squaredle Solver is designed to enhance your puzzle experience:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">Educational</h3>
                    <p className="text-slate-600 text-sm">Learn new words and their meanings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">Complete Solutions</h3>
                    <p className="text-slate-600 text-sm">Find every possible word, including bonus words</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👁️</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">Visual Learning</h3>
                    <p className="text-slate-600 text-sm">See exactly how each word connects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">Instant Results</h3>
                    <p className="text-slate-600 text-sm">Get solutions in under 2 seconds</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Example Grid</h2>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-slate-600 mb-4">Here's an example 4×4 Squaredle grid:</p>
                <div className="inline-grid grid-cols-4 gap-2 bg-white p-4 rounded-lg shadow-sm">
                  {['T', 'E', 'S', 'T'].map((letter, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-800">
                      {letter}
                    </div>
                  ))}
                  {['I', 'M', 'E', 'R'].map((letter, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-800">
                      {letter}
                    </div>
                  ))}
                  {['N', 'E', 'L', 'S'].map((letter, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-800">
                      {letter}
                    </div>
                  ))}
                  {['G', 'A', 'M', 'E'].map((letter, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-800">
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Some words you could find: TEST, TIME, GAME, SMILE, TEAMS, STEAM
                </p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Where to Play Squaredle</h2>
            <p className="text-slate-600 mb-6">
              You can play the official daily Squaredle puzzle at the official Squaredle website. 
              Each day features a new puzzle with varying grid sizes (usually 4×4 or 5×5). 
              The puzzles get progressively more challenging throughout the week!
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-semibold text-amber-800 mb-2">💡 Pro Tip</h3>
              <p className="text-amber-700 text-sm">
                Try solving the puzzle yourself first, then use our solver to find any words you missed. 
                This way, you learn new vocabulary while still enjoying the challenge!
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-sky-200/50 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <span>🧩</span>
              <span>Try Our Solver</span>
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <span>📧</span>
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}