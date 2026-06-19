/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export default function Logo({ className = '', size = 'md', showTagline = true }: LogoProps) {
  // Let's size the logo beautifully using responsive wrapper scales
  const dimensions = {
    sm: { width: '130px', height: '40px' },
    md: { width: '190px', height: '60px' },
    lg: { width: '280px', height: '90px' },
    xl: { width: '400px', height: '130px' }
  };

  const currentDim = dimensions[size];

  return (
    <div className={`flex flex-col items-start select-none ${className}`} id="ant-logo-wrapper">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: currentDim.width, height: 'auto', maxHeight: currentDim.height }}
        aria-label="Ant Architecture Logo"
        className="transition-all duration-300 hover:scale-102"
      >
        {/* Ant letters in hand-drawn stroke style */}
        <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Letter 'A' of Ant - flowing artistically */}
          <path
            d="M 50 78 C 30 78, 15 65, 15 48 C 15 30, 32 18, 55 18 C 75 18, 85 30, 85 45 C 85 58, 70 78, 92 78 C 102 78, 110 65, 115 55"
            strokeWidth="5.5"
            className="text-black"
          />
          
          {/* Letter 'n' of Ant - handwritten style */}
          <path
            d="M 108 51 C 112 43, 118 36, 128 36 C 138 36, 140 45, 140 54 L 140 76"
            strokeWidth="5"
            className="text-black"
          />
          
          {/* Letter 't' of Ant - elegant tall brush stroke */}
          <path
            d="M 154 28 L 154 74 C 154 78, 156 80, 162 80 C 168 80, 175 75, 180 70"
            strokeWidth="5.5"
            className="text-black"
          />
          {/* Crossbar of 't' */}
          <path
            d="M 144 45 L 168 40"
            strokeWidth="4.5"
            className="text-black"
          />
          
          {/* Delicate Ant Antennae extending from head of 't' */}
          <path
            d="M 154 28 C 158 18, 169 12, 182 10"
            strokeWidth="2.5"
            className="text-black/80"
          />
          <path
            d="M 154 28 C 151 18, 140 10, 128 8"
            strokeWidth="2.5"
            className="text-black/80"
          />
        </g>

        {/* Artistic brush-written "Architecture" */}
        {/* Underneath, offset to the right */}
        {/* Letter "A" is written in dramatic red ink brush! */}
        <g transform="translate(145, 62)">
          {/* The Capital "A" in Red Brush Paint */}
          <path
            d="M 15 25 L 22 4 C 23 2, 25 2, 26 5 L 34 25 M 18 16 L 31 16"
            stroke="#DC2626"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Decorative artistic bleed lines for the handwritten "A" in red */}
          <path
            d="M 13 28 C 14 26, 15 22, 17 25"
            stroke="#DC2626"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lettering for "rchitecture" using highly polished geometric blueprint layout */}
          {/* "r c h i t e c t u r e" with elegant letter spacing */}
          <text
            x="40"
            y="22"
            fontFamily="Space Grotesk, system-ui, sans-serif"
            fontWeight="500"
            fontSize="18"
            fill="currentColor"
            letterSpacing="2.8"
            className="text-neutral-800"
          >
            rchitecture
          </text>
        </g>
      </svg>
      {showTagline && (
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono mt-0.5 pl-3">
          3D Visualization • 2D Drafting
        </span>
      )}
    </div>
  );
}
