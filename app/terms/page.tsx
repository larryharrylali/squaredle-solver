'use client';

import Link from 'next/link';

export default function TermsOfService() {
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
            📋 Terms of Service
          </h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-600 mb-6">
              By accessing and using Squaredle Solver, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Description of Service</h2>
            <p className="text-slate-600 mb-4">
              Squaredle Solver is a free online tool that helps users solve Squaredle puzzles by:
            </p>
            <ul className="text-slate-600 mb-6 space-y-2">
              <li>Finding all possible words in a given letter grid</li>
              <li>Displaying visual paths showing how words connect</li>
              <li>Providing word definitions for educational purposes</li>
              <li>Saving puzzle grids locally for user convenience</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Use License</h2>
            <p className="text-slate-600 mb-4">
              Permission is granted to temporarily use Squaredle Solver for personal, non-commercial purposes. 
              This includes the right to:
            </p>
            <ul className="text-slate-600 mb-6 space-y-2">
              <li>Use the service to solve Squaredle puzzles</li>
              <li>Access word definitions and learning features</li>
              <li>Share results with others for educational or entertainment purposes</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Restrictions</h2>
            <p className="text-slate-600 mb-4">You are specifically restricted from:</p>
            <ul className="text-slate-600 mb-6 space-y-2">
              <li>Using the service for commercial purposes without permission</li>
              <li>Attempting to reverse engineer or copy the solving algorithms</li>
              <li>Using automated tools to overload our servers</li>
              <li>Publishing or redistributing any part of the service</li>
              <li>Using the service in any way that could damage or disable it</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Disclaimer</h2>
            <p className="text-slate-600 mb-6">
              The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, 
              Squaredle Solver excludes all representations, warranties, conditions and terms related to our website 
              and use of this website. We do not guarantee the accuracy or completeness of word solutions.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 mb-6">
              In no event shall Squaredle Solver, nor any of its officers, directors and employees, be held liable 
              for anything arising out of or in any way connected with your use of this website whether such 
              liability is under contract, tort or otherwise.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Accuracy of Materials</h2>
            <p className="text-slate-600 mb-6">
              The materials appearing on Squaredle Solver could include technical, typographical, or photographic 
              errors. We do not warrant that any of the materials on its website are accurate, complete or current. 
              We may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Modifications</h2>
            <p className="text-slate-600 mb-6">
              Squaredle Solver may revise these terms of service at any time without notice. By using this website, 
              you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Third-Party Services</h2>
            <p className="text-slate-600 mb-6">
              Our service integrates with third-party services including Google AdSense for advertisements and 
              Buy Me a Coffee for donations. Your use of these services is subject to their respective terms of service.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Contact Information</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about these Terms of Service, please contact us through our 
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline"> Contact Us</Link> page.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-sky-200/50">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <span>🧩</span>
              <span>Back to Squaredle Solver</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}