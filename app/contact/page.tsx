'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to API endpoint)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-sky-200/50 p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6">
              📧 Contact Us
            </h1>
            <p className="text-slate-600 mb-8">
              Have questions, suggestions, or found a bug? We&apos;d love to hear from you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-sky-50/50 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-sky-50/50 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-sky-50/50 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a topic...</option>
                  <option value="bug">🐛 Bug Report</option>
                  <option value="feature">💡 Feature Request</option>
                  <option value="feedback">💭 General Feedback</option>
                  <option value="support">❓ Support Question</option>
                  <option value="business">💼 Business Inquiry</option>
                  <option value="other">📝 Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-sky-50/50 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us more about your question, feedback, or suggestion..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Send Message 📤
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Response Times */}
            <div className="bg-white rounded-2xl shadow-lg border border-sky-200/50 p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                ⏱️ Response Times
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">
                    <strong>Bug Reports:</strong> Within 24 hours
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">
                    <strong>Feature Requests:</strong> 2-3 business days
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">
                    <strong>General Inquiries:</strong> 3-5 business days
                  </span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                🤔 Check Our FAQ First
              </h2>
              <p className="text-slate-600 mb-4">
                Many common questions are already answered in our FAQ section.
              </p>
              <Link 
                href="/#faq" 
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <span>📚</span>
                <span>View FAQ</span>
              </Link>
            </div>

            {/* Support Us */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50 p-6">
              <h2 className="text-xl font-bold text-amber-700 mb-4">
                ☕ Support Our Work
              </h2>
              <p className="text-slate-600 mb-4">
                Love using Squaredle Solver? Consider buying us a coffee to support continued development!
              </p>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium">
                <span>☕</span>
                <span>Buy Me a Coffee</span>
              </button>
            </div>

            {/* Tips for Better Support */}
            <div className="bg-white rounded-2xl shadow-lg border border-sky-200/50 p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                💡 Tips for Better Support
              </h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Be specific about the issue you&apos;re experiencing</li>
                <li>• Include steps to reproduce bugs</li>
                <li>• Mention your browser and device type</li>
                <li>• Attach screenshots if helpful</li>
                <li>• Check if the issue persists in different browsers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <span>🧩</span>
            <span>Back to Squaredle Solver</span>
          </Link>
        </div>
      </main>
    </div>
  );
}