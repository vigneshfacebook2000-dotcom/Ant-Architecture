/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../mockData';
import { PortfolioItem } from '../types';
import { Layers, Eye, MapPin, CheckSquare, Crosshair, ArrowUpRight } from 'lucide-react';

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '3d' | 'interior' | 'exterior' | 'landscape'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', name: 'Show All Profiles', icon: Layers },
    { id: '3d', name: '3D Visualization', icon: Eye },
    { id: 'interior', name: 'Interior Drawings', icon: Crosshair },
    { id: 'exterior', name: 'Exterior Drawings', icon: Layers },
    { id: 'landscape', name: 'Landscape Architecture', icon: CheckSquare }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedFilter);

  // Map nice readable categories
  const categoryLabels: Record<string, string> = {
    '3d': '3D Photorealistic Visualization',
    'interior': '2D/3D Interior Millwork & Floorplans',
    'exterior': '2D/3D Structural Exterior Elevations',
    'landscape': '2D/3D Landscape & Hydrological Projects'
  };

  return (
    <section className="bg-[#F9F9F7] py-20 border-t border-[#E5E5E1]" id="portfolio-gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-black/40 font-bold block">
              Established Architectural Practice
            </span>
            <h2 className="font-display text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-4xl">
              Specialized Studio Disciplines
            </h2>
            <p className="max-w-2xl text-xs text-black/55 leading-relaxed font-sans">
              We translate abstract architectural briefs into highly descriptive 2D schematics and photorealistic 3D virtualizations across external envelopes, interior styling, and integrated landscaping. Select a layer to filter files:
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2.5 mb-10" id="portfolio-filters">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-none border transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black/60 border-[#E5E5E1] hover:text-black hover:border-black'
                }`}
                id={`item-filter-${cat.id}`}
              >
                <Icon className="h-3 w-3" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Grid of Portfolio items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-items-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white rounded-none overflow-hidden border border-[#E5E5E1] hover:border-black transition-all duration-300 flex flex-col h-full"
              id={`portfolio-card-${item.id}`}
            >
              {/* Image box */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#F0F0EE]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category overlay label */}
                <div className="absolute top-3 left-3 bg-white border border-[#E5E5E1] px-2 py-0.5 rounded-none text-[9px] font-mono uppercase font-bold text-black tracking-wider">
                  {item.category === '3d' ? '3D Render' : `${item.category} drawing`}
                </div>
                
                {/* Expand overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white p-2.5 rounded-none border border-black/10">
                    <ArrowUpRight className="h-4 w-4 text-black" />
                  </div>
                </div>
              </div>

              {/* Text content area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-black/40">
                    <MapPin className="h-3 w-3" />
                    <span className="text-[9px] font-mono uppercase tracking-widest font-bold">{item.location}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#1A1A1A] group-hover:text-black tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-black/60 font-sans leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Scope Preview */}
                <div className="pt-3 border-t border-[#E5E5E1] flex flex-wrap gap-1.5">
                  {item.scope.slice(0, 2).map((sc, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-[#F9F9F7] border border-[#E5E5E1] text-[9px] font-mono text-black/50 px-2.5 py-0.5 rounded-none"
                    >
                      {sc}
                    </span>
                  ))}
                  {item.scope.length > 2 && (
                    <span className="inline-block bg-[#F9F9F7] text-[9px] font-mono text-black/40 px-1.5 py-0.5 border border-dashed border-[#E5E5E1]">
                      +{item.scope.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="portfolio-modal">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setSelectedItem(null)} 
            />
            
            {/* Modal Box */}
            <div className="relative bg-white rounded-none overflow-hidden max-w-4xl w-full border border-[#E5E5E1] flex flex-col lg:flex-row max-h-[90vh]">
              
              {/* Left Column (Image) */}
              <div className="lg:w-4/7 bg-[#F0F0EE] aspect-16/10 lg:aspect-auto relative">
                <img 
                  src={selectedItem.imageSrc} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Coordinates watermark */}
                <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/50 bg-black/80 px-2 py-1 rounded-none border border-white/5 uppercase tracking-wider">
                  ANT_ARCH // {selectedItem.id.toUpperCase()}
                </div>
              </div>

              {/* Right Column (Specifications & Description) */}
              <div className="lg:w-3/7 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E5E5E1] pb-4">
                    <span className="font-mono text-[9px] uppercase bg-black text-white px-2.5 py-1 rounded-none font-bold tracking-widest">
                      {categoryLabels[selectedItem.category] || 'Architectural Showcase'}
                    </span>
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="text-black/50 hover:text-black text-[10px] uppercase tracking-wider font-bold p-1 cursor-pointer"
                      id="close-portfolio-modal"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-black leading-tight uppercase tracking-wide">
                      {selectedItem.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-black/40">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">{selectedItem.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block font-mono text-[9px] uppercase text-black/40 font-bold tracking-widest">
                      Design Context & Concept
                    </span>
                    <p className="text-xs text-black/70 leading-relaxed font-sans">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="block font-mono text-[9px] uppercase text-black/40 font-bold tracking-widest">
                      Deliverables & Drawing Scope
                    </span>
                    <div className="grid grid-cols-1 gap-2" id="portfolio-modal-scope">
                      {selectedItem.scope.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-black/70 font-sans">
                          <CheckSquare className="h-3.5 w-3.5 text-black shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E5E1]">
                  <p className="text-[9px] font-mono text-black/40 uppercase tracking-wider">
                    Contact our principal architect in the workspace portal to initiate a site session.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
