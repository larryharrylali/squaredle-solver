'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import type { Position } from '@/lib/types';

interface PathVisualizerProps {
  word: string;
  grid: string[][];
  paths: Position[][];
  onClose: () => void;
}

export default function PathVisualizer({ word, grid, paths, onClose }: PathVisualizerProps) {
  console.log('🎨 PathVisualizer rendering with paths:', paths.length);
  
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentPath = paths[currentPathIndex] || [];
  const gridSize = grid.length;
  const cellSize = 60;
  const padding = 10;
  const svgSize = gridSize * cellSize + padding * 2;

  const animatePath = () => {
    setIsAnimating(true);
    
    // Clear any existing animation
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    // Animation duration based on word length
    const duration = currentPath.length * 200;
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, duration);
  };

  useEffect(() => {
    // Auto-animate on mount
    const animate = () => {
      setIsAnimating(true);
      
      // Clear any existing animation
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      // Animation duration based on word length
      const duration = currentPath.length * 200;
      
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    };
    
    animate();
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [currentPathIndex, currentPath.length]);

  const handleReplay = () => {
    animatePath();
  };

  const handleNextPath = () => {
    if (paths.length > 1) {
      setCurrentPathIndex((prev) => (prev + 1) % paths.length);
    }
  };

  const getCellCenter = (pos: Position) => {
    return {
      x: padding + pos.col * cellSize + cellSize / 2,
      y: padding + pos.row * cellSize + cellSize / 2,
    };
  };

  const createPathString = () => {
    if (currentPath.length === 0) return '';
    
    const points = currentPath.map(getCellCenter);
    let pathString = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      pathString += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return pathString;
  };

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (paths.length === 0) {
    console.log('🚨 PathVisualizer: No paths, returning null');
    return null;
  }

  console.log('✅ PathVisualizer: About to render modal');

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">
            Path: {word}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* SVG Grid Visualization */}
        <div className="flex justify-center mb-4">
          <svg
            ref={svgRef}
            width={svgSize}
            height={svgSize}
            className="border-2 border-gray-200 rounded-lg bg-white"
          >
            {/* Grid cells */}
            {grid.map((row, rowIndex) =>
              row.map((letter, colIndex) => {
                const center = getCellCenter({ row: rowIndex, col: colIndex });
                const isInPath = currentPath.some(
                  pos => pos.row === rowIndex && pos.col === colIndex
                );
                const pathPosition = currentPath.findIndex(
                  pos => pos.row === rowIndex && pos.col === colIndex
                );

                return (
                  <g key={`${rowIndex}-${colIndex}`}>
                    {/* Cell background */}
                    <rect
                      x={padding + colIndex * cellSize}
                      y={padding + rowIndex * cellSize}
                      width={cellSize}
                      height={cellSize}
                      fill={isInPath ? '#dbeafe' : 'white'}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      className={clsx(
                        'transition-colors duration-300',
                        isInPath && 'fill-blue-100'
                      )}
                    />
                    
                    {/* Letter */}
                    <text
                      x={center.x}
                      y={center.y}
                      dominantBaseline="middle"
                      textAnchor="middle"
                      className={clsx(
                        'text-2xl font-bold select-none',
                        isInPath ? 'fill-blue-900' : 'fill-gray-700'
                      )}
                    >
                      {letter}
                    </text>
                    
                    {/* Position number */}
                    {isInPath && pathPosition >= 0 && (
                      <circle
                        cx={padding + colIndex * cellSize + 10}
                        cy={padding + rowIndex * cellSize + 10}
                        r="8"
                        fill="#3b82f6"
                        className={clsx(
                          isAnimating && 'animate-pulse'
                        )}
                      />
                    )}
                    {isInPath && pathPosition >= 0 && (
                      <text
                        x={padding + colIndex * cellSize + 10}
                        y={padding + rowIndex * cellSize + 10}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="text-xs font-bold fill-white select-none"
                      >
                        {pathPosition + 1}
                      </text>
                    )}
                  </g>
                );
              })
            )}

            {/* Path line */}
            <path
              d={createPathString()}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
              style={{
                strokeDasharray: isAnimating ? 1000 : 0,
                strokeDashoffset: isAnimating ? 1000 : 0,
                animation: isAnimating ? 'path-draw 2s ease-out forwards' : 'none',
              }}
            />

            {/* Path dots */}
            {currentPath.map((pos, index) => {
              const center = getCellCenter(pos);
              return (
                <circle
                  key={index}
                  cx={center.x}
                  cy={center.y}
                  r="4"
                  fill="#3b82f6"
                  className={clsx(
                    isAnimating && 'animate-bounce',
                    'transition-all duration-300'
                  )}
                  style={{
                    animationDelay: isAnimating ? `${index * 100}ms` : '0ms',
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Word display */}
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-1">
            {word.split('').map((letter, index) => (
              <span
                key={index}
                className={clsx(
                  'inline-block px-2 py-1 bg-blue-100 text-blue-900 rounded font-bold text-lg',
                  isAnimating && 'animate-pulse',
                  'transition-all duration-300'
                )}
                style={{
                  animationDelay: isAnimating ? `${index * 100}ms` : '0ms',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2">
          <button
            onClick={handleReplay}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            🔄 Replay Animation
          </button>
          
          {paths.length > 1 && (
            <button
              onClick={handleNextPath}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Next Path ({currentPathIndex + 1}/{paths.length})
            </button>
          )}
        </div>

        {/* Info */}
        <div className="text-sm text-gray-500 text-center mt-4">
          <p>{word.length} letters • Path {currentPathIndex + 1} of {paths.length}</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes path-draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `
      }} />
    </div>
  );
}