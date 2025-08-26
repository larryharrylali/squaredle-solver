'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
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
            🔒 Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-blue max-w-none">
            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              Squaredle Solver is committed to protecting your privacy. We collect minimal information to provide our service:
            </p>
            <ul className="text-slate-600 mb-6 space-y-2">
              <li><strong>Puzzle Data:</strong> Letters you enter are processed locally in your browser and not stored on our servers</li>
              <li><strong>Usage Analytics:</strong> We may use Google Analytics to understand how our service is used (anonymous data only)</li>
              <li><strong>Local Storage:</strong> Your puzzle grids are saved locally in your browser for convenience</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">How We Use Information</h2>
            <p className="text-slate-600 mb-4">The information we collect is used to:</p>
            <ul className="text-slate-600 mb-6 space-y-2">
              <li>Provide and improve our puzzle solving service</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Display relevant advertisements through Google AdSense</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Third-Party Services</h2>
            <p className="text-slate-600 mb-4">We use the following third-party services:</p>
            <ul className="text-slate-600 mb-6 space-y-2">
              <li><strong>Google AdSense:</strong> For displaying advertisements (subject to Google's privacy policy)</li>
              <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
              <li><strong>Buy Me a Coffee:</strong> For voluntary donations (subject to their privacy policy)</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Cookies and Local Storage</h2>
            <p className="text-slate-600 mb-6">
              We use local storage to save your puzzle grids for convenience. We may also use cookies for analytics 
              and advertising purposes. You can disable cookies in your browser settings, but this may affect functionality.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Data Security</h2>
            <p className="text-slate-600 mb-6">
              Your puzzle data is processed entirely in your browser and is not transmitted to our servers. 
              We implement appropriate security measures to protect any data we do collect.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Children's Privacy</h2>
            <p className="text-slate-600 mb-6">
              Our service is suitable for all ages. We do not knowingly collect personal information from children under 13. 
              If you are a parent and believe your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Changes to Privacy Policy</h2>
            <p className="text-slate-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us through our 
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