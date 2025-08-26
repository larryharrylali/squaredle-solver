# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Squaredle Solver** project - a web application designed to solve daily Squaredle puzzles instantly with visual path animations. The project is currently in the pre-development phase with a complete PRD (Product Requirements Document) finalized and ready for implementation.

## Core Architecture & Tech Stack (From PRD)

The project will be built using a proven, simplified tech stack:

- **Frontend Framework**: Next.js 14 with App Router (for SEO optimization)
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Zustand + React Query
- **Processing**: Web Workers for algorithm processing
- **Storage**: IndexedDB (dictionary caching), LocalStorage (user preferences)
- **PWA**: Service Worker for offline capability
- **Hosting**: Vercel with Cloudflare CDN

## Key Performance Requirements

When implementing, ensure these critical performance metrics are met:
- **Page Load**: <1.2 seconds LCP
- **Solve Time**: <1.5 seconds for 4x4 grid, <3 seconds for 5x5
- **Core Web Vitals**: LCP <1.2s, FID <100ms, CLS <0.1

## Development Commands

Since this project hasn't been initialized yet, here are the standard Next.js commands that will be used:

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript checking

# Testing (when implemented)
npm run test         # Jest unit tests
npm run test:watch   # Jest in watch mode
npm run test:e2e     # Playwright end-to-end tests

# PWA & Performance
npm run audit        # Performance audit
npm run lighthouse   # Lighthouse testing
```

## Core Algorithm Architecture

The heart of the application is the word-finding algorithm:

1. **Dictionary**: ENABLE word list (172,820 words, public domain) loaded into a Trie data structure
2. **Algorithm**: Depth-First Search (DFS) with Trie pruning for optimization
3. **Processing**: Runs in Web Worker to avoid blocking the UI thread
4. **Caching**: Results cached in IndexedDB for offline usage

## Critical Implementation Details

### Grid Input System
- Support 4x4 and 5x5 grids with 60x60px touch targets for mobile
- Smart parsing: handle various input formats ("ABCD EFGH", "ABCD-EFGH", "ABCDEFGH")
- Auto-uppercase and filter invalid characters
- Recent puzzles storage (last 10)

### Path Visualization
- SVG-based animations at 60fps
- Color-coded by word length (Blue/Green/Gold) 
- Click word → show animated path
- Simple replay functionality (no speed controls per PRD)
- Mobile-optimized with haptic feedback

### SEO-Critical Structure
The application must implement these exact URL structures for SEO:
- `/` - Main solver interface
- `/squaredle-cheat` - Conversion-focused page
- `/how-to-solve-squaredle` - Educational content
- `/daily-squaredle-answers` - Daily content strategy
- `/squaredle-help` - Help and tips

## Mobile-First Design Requirements

The PRD specifies mobile-first design with these exact specifications:
- **Grid**: 280x280px total, 60x60px cells for touch targets
- **Actions**: Large touch buttons for Solve/Paste/Clear
- **Results**: Collapsible sections by word length
- **Benefits**: Card-based layout with conversational tone
- **FAQ**: SEO-optimized expandable questions

## Business Logic Implementation

### Freemium Model
- Free tier: Unlimited solving, 5 historical puzzles max, small banner ad
- Premium tier: Ad-free, unlimited history, export features, statistics
- Implement usage tracking but maintain privacy (no PII collection)

### Dictionary Compliance
- **Primary**: ENABLE dictionary (public domain, safe to use)
- **Alternative**: If needed, NASPA NWL2023 (check licensing)
- Dictionary must be compressed and cached in IndexedDB

## File Structure (When Implemented)

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main solver interface
│   ├── squaredle-cheat/         # SEO pages
│   └── how-to-solve-squaredle/  # Educational content
├── components/
│   ├── Grid/                    # Puzzle input grid
│   ├── Results/                 # Word results display
│   ├── PathVisualizer/          # SVG animations
│   └── FAQ/                     # SEO FAQ component
├── lib/
│   ├── solver/                  # Core algorithm
│   ├── dictionary/              # ENABLE word list handling
│   └── storage/                 # IndexedDB operations
├── workers/
│   └── solver.worker.ts         # Algorithm processing
└── styles/
    └── globals.css              # Tailwind CSS
```

## SEO Implementation Priority

The PRD emphasizes that SEO success is critical. Target keywords:
1. **Primary**: "squaredle solver" (2,400/month, KD: 8)
2. **Secondary**: "squaredle cheat", "squaredle help", "squaredle answers"
3. **Long-tail**: "how to solve squaredle", "mobile squaredle solver"

Implement proper meta tags, structured data, and page speed optimization.

## Testing Strategy

When implementing tests, focus on:
- Algorithm correctness (100% word finding accuracy)
- Performance benchmarks (solve time requirements)
- Mobile touch interactions
- SEO meta tag validation
- PWA offline functionality

## Development Timeline

According to the PRD, this is an 8-week development project:
- **Weeks 1-2**: Foundation & SEO setup
- **Weeks 3-4**: Core features (algorithm, visualization)
- **Weeks 5-6**: Polish & performance optimization
- **Weeks 7-8**: Launch preparation

The project is marked as "Ready for Development" with no further decisions needed - implementation can begin immediately following this technical specification.