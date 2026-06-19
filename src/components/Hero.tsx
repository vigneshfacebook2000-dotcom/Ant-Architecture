/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Compass, Maximize2, ShieldCheck, Cpu } from 'lucide-react';
import Logo from './Logo';
import { PORTFOLIO_ITEMS } from '../mockData';

interface HeroProps {
  onEnterPortal: () => void;
}

export default function Hero({ onEnterPortal }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-24 border-b border-[#E5E5E1]" id="home-hero-section">
      
      {/* Blueprint Grid Watermark Backdrop */}
      <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" />
      
      {/* Abstract geometric focus outline matching blueprint styles */}
      <div className="absolute top-10 right-10 w-96 h-96 border border-black/5 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-10 left-10 w-64 h-64 border border-black/5 pointer-events-none hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero statement column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Fine line branding detail */}
            <div className="inline-flex items-center gap-2 border border-[#E5E5E1] bg-[#F9F9F7] px-3.5 py-1.5 rounded-none" id="hero-badge">
              <span className="flex h-2 w-2 bg-black animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/80 font-bold">
                Cabinet of Architecture & Visualization
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1A1A1A] leading-[1.15]" id="hero-primary-headline">
                Designing spaces <br />
                <span className="text-black/40 font-light">that connect nature</span><br />
                with structural honesty.
              </h1>
              <p className="max-w-xl text-sm text-black/60 font-sans leading-relaxed">
                Ant Architecture leverages high-precision BIM models, daylight sun simulations, and local plant coordinates to execute stunning building envelopes. Our client revision workstation connects the owner and drafting office together in real-time.
              </p>
            </div>

            {/* Quick specifications blueprint metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-[#E5E5E1] py-6" id="blueprint-metrics-bar">
              <div className="space-y-1">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Resolution</span>
                <span className="block font-display text-sm font-semibold text-black uppercase tracking-wider">8K Render</span>
              </div>
              <div className="space-y-1 border-l border-[#E5E5E1] pl-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Precision</span>
                <span className="block font-display text-sm font-semibold text-black uppercase tracking-wider">1.2mm BIM</span>
              </div>
              <div className="space-y-1 border-l border-[#E5E5E1] pl-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Disciplines</span>
                <span className="block font-display text-sm font-semibold text-black uppercase tracking-wider">Tri-Zonal CAD</span>
              </div>
              <div className="space-y-1 border-l border-[#E5E5E1] pl-4">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Collab Mode</span>
                <span className="block font-display text-sm font-semibold text-black uppercase tracking-wider">Live Workspace</span>
              </div>
            </div>

            {/* CTA Controls */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onEnterPortal}
                className="group flex items-center justify-center gap-2.5 bg-black font-bold text-white px-6 py-3 rounded-none transition-all duration-300 hover:bg-neutral-800 cursor-pointer text-xs uppercase tracking-widest"
                id="hero-cta-portal"
              >
                Launch Collaboration Portal
                <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-1" />
              </button>
              
              <a
                href="#portfolio-gallery"
                className="flex items-center justify-center gap-1.5 border border-[#E5E5E1] font-bold text-[#1A1A1A] px-6 py-3 rounded-none transition-all duration-300 hover:bg-neutral-50 text-xs uppercase tracking-widest"
                id="hero-cta-portfolio"
              >
                Browse Portfolio
              </a>
            </div>

          </div>

          {/* Right Hero showcase graphic/conceptual render */}
          <div className="lg:col-span-5 relative" id="hero-graphic-column">
            
            <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-[#F0F0EE] rounded-none overflow-hidden shadow-none border border-[#E5E5E1]">
              
              {/* Draft overlay coordinates around the image */}
              <div className="absolute top-4 left-4 z-10 bg-black/80 px-2.5 py-1 rounded-none border border-white/10 text-[9px] font-mono text-white uppercase tracking-wider">
                CAM_A9 // DRAFT_EXT_01
              </div>

              {/* Grid axes overlay (aesthetic) */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-white/10 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 h-px border-t border-white/10 pointer-events-none" />

              <img 
                src={PORTFOLIO_ITEMS[0].imageSrc} 
                alt="Ant Architecture Brutalist Exterior Visualization" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Glowing aesthetic drafting pin over the hero image simulating client portal */}
              <div className="absolute top-[42%] left-[35%] z-20 pointer-events-none">
                <span className="absolute inline-flex h-5 w-5 bg-black/65 opacity-60 animate-ping"></span>
                <span className="relative flex h-3 w-3 items-center justify-center rounded-none bg-black border border-white shadow-sm"></span>
                <div className="absolute top-full left-4 mt-1 bg-white p-2.5 rounded-none border border-[#E5E5E1] text-[9px] text-[#1A1A1A] shadow-sm w-36 leading-tight whitespace-normal">
                  <span className="font-bold block text-[8px] tracking-wider uppercase text-black/40">SCENE REMARK //</span>
                  "Adjust cedar stain warmth"
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}