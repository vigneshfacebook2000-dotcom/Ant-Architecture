/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import ClientPortal from './components/ClientPortal';
import { INITIAL_PROJECTS, TEAM_MEMBERS } from './mockData';
import { Project } from './types';
import { 
  Building2, 
  Paintbrush, 
  Map, 
  Compass, 
  ShieldAlert, 
  Users, 
  ArrowRight,
  MessageSquare,
  Sparkles,
  Layers
} from 'lucide-react';

export default function App() {
  // Tab control: 'landing' or 'portal'
  const [activeTab, setActiveTab] = useState<'landing' | 'portal'>('landing');

  // Sandbox simulated role: 'client' or 'architect'
  const [mockRole, setMockRole] = useState<'client' | 'architect'>('client');

  // Local state for our active persistent projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('ant_architecture_projects_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed parsing local storage database:', err);
      }
    }
    return INITIAL_PROJECTS;
  });

  // Persist project database shifts
  useEffect(() => {
    localStorage.setItem('ant_architecture_projects_db', JSON.stringify(projects));
  }, [projects]);

  // Reset demo databases helper
  const handleResetDatabase = () => {
    if (window.confirm('Are you sure you want to reset ongoing project logs back to defaults? This will wipe your custom coordinate pins.')) {
      setProjects(INITIAL_PROJECTS);
      localStorage.removeItem('ant_architecture_projects_db');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F7] selection:bg-neutral-200 text-[#1A1A1A]" id="ant-app-container">
      
      {/* Dynamic top message explaining active simulation sandbox role */}
      <div className="bg-[#1A1A1A] text-white text-[10px] font-mono py-2 px-4 text-center flex flex-col md:flex-row items-center justify-center gap-2 border-b border-white/5 uppercase tracking-wider" id="simulation-banner">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 bg-white animate-pulse"></span>
          <span>Simulation Active: </span>
          <span className="font-bold underline text-white capitalize">{mockRole} WORKSPACE</span>
        </span>
        <span className="hidden md:inline opacity-30">•</span>
        <span>
          Click to swap to 
          <button 
            onClick={() => setMockRole(mockRole === 'client' ? 'architect' : 'client')}
            className="underline text-white hover:text-white/80 px-2 py-0.5 bg-white/10 rounded-none mx-1 font-bold inline-block cursor-pointer transition-colors"
          >
            {mockRole === 'client' ? 'Lead Architect' : 'Authorized Client'}
          </button> 
          control views
        </span>
      </div>

      {/* Main sticky header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        mockRole={mockRole}
        setMockRole={setMockRole}
        clientName="Julian & Sarah"
      />

      {/* Primary body switcher */}
      <main className="flex-1">
        {activeTab === 'landing' ? (
          <div className="space-y-0" id="landing-main-view">
            
            {/* Visual Hero landing */}
            <Hero onEnterPortal={() => setActiveTab('portal')} />

            {/* Architectural disciplines summary */}
            <section className="bg-white py-20 border-t border-[#E5E5E1]" id="services-disciplines">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/40 font-bold block">
                    Complete Studio Capabilities
                  </span>
                  <h2 className="font-display text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-4xl">
                    Integrated Architectural Drafting Layers
                  </h2>
                  <p className="text-sm text-black/50 leading-relaxed font-sans">
                    Rather than dealing with detached specialists, Ant Architecture coordinates your spatial footprint across three foundational axes of your project, maintaining cohesive material palettes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="disciplines-bento-grid">
                  
                  {/* Category 1: Interior Architecture */}
                  <div className="bg-[#F9F9F7] hover:bg-[#F0F0EE] transition-all p-8 rounded-none border border-[#E5E5E1] text-left flex flex-col justify-between space-y-8">
                    <div className="space-y-4">
                      <div className="h-10 w-10 bg-black flex items-center justify-center text-white">
                        <Paintbrush className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
                        2D & 3D Interior Architecture
                      </h3>
                      <p className="text-xs text-black/60 leading-relaxed font-sans">
                        Comprehensive interior layouts, reflected ceiling plans, electrical coordinates, and detailed hand-drawn millwork blueprints. We specialize in custom woodwork assemblies, marble hobs, and natural plaster finishes.
                      </p>
                    </div>
                    <ul className="space-y-2 border-t border-[#E5E5E1] pt-4 text-[11px] font-mono text-black/50">
                      <li>• Reflected Ceiling & Lighting Plans</li>
                      <li>• Bespoke Joinery & Millwork detail</li>
                      <li>• Ergonomic furniture alignment</li>
                    </ul>
                  </div>

                  {/* Category 2: Exterior Design & Renders */}
                  <div className="bg-black text-white p-8 rounded-none text-left flex flex-col justify-between space-y-8 border border-black/10">
                    <div className="space-y-4">
                      <div className="h-10 w-10 bg-white/10 flex items-center justify-center text-white">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white">
                        3D Photorealistic Visualization
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed font-sans">
                        Using advanced light transport algorithms, we create photorealistic 8K daylight and evening renders that replicate exact material behaviors, helping clients preview shadow patterns across various times of day.
                      </p>
                    </div>
                    <ul className="space-y-2 border-t border-white/10 pt-4 text-[11px] font-mono text-white/50">
                      <li>• Active Sun Path & Shade studies</li>
                      <li>• Concrete & Cedar micro-grain textures</li>
                      <li>• High-fidelity nocturnal dusk studies</li>
                    </ul>
                  </div>

                  {/* Category 3: Landscape Architecture */}
                  <div className="bg-[#F9F9F7] hover:bg-[#F0F0EE] transition-all p-8 rounded-none border border-[#E5E5E1] text-left flex flex-col justify-between space-y-8">
                    <div className="space-y-4">
                      <div className="h-10 w-10 bg-black flex items-center justify-center text-white">
                        <Map className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
                        2D & 3D Landscape Integration
                      </h3>
                      <p className="text-xs text-black/60 leading-relaxed font-sans">
                        Coordinating structural outdoor pavilions, stone hardscapes, perimeter brickworks, and native plant selections with automatic drip-feed irrigations. Beautiful architectural water features offset heavy concrete boundaries.
                      </p>
                    </div>
                    <ul className="space-y-2 border-t border-[#E5E5E1] pt-4 text-[11px] font-mono text-black/50">
                      <li>• Hydrological layouts & water pools</li>
                      <li>• Natural porphyry paving layouts</li>
                      <li>• Sculptural native flora selection</li>
                    </ul>
                  </div>

                </div>

              </div>
            </section>

            {/* Display Portfolio items */}
            <Portfolio />

            {/* Collaboration cycle blueprint steps */}
            <section className="bg-white py-20 border-t border-[#E5E5E1]" id="collaboration-steps">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-16">
                
                <div className="space-y-4 max-w-2xl mx-auto">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-black/40 font-bold block">
                    Our Client Co-design Method
                  </span>
                  <h2 className="font-display text-3xl font-light tracking-tight text-neutral-900">
                    Transparent, Localized Iterations
                  </h2>
                  <p className="text-sm text-black/50">
                    Traditional design firms isolate clients behind PDF emails. Ant Architecture places drawings and 3D renders at the center of a collaborative workspace.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left" id="steps-row">
                  
                  <div className="space-y-3 p-6 bg-white rounded-none border-l-2 border-black pl-4">
                    <span className="block font-mono text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      01 / Volumetric Draft
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                      Form & Context Modeling
                    </h4>
                    <p className="text-xs text-black/60 leading-relaxed">
                      We initiate the architectural plan on-site, compiling spatial volume masses on Google Maps terrain files.
                    </p>
                  </div>

                  <div className="space-y-3 p-6 bg-white rounded-none border-l-2 border-black/20 pl-4">
                    <span className="block font-mono text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      02 / Coordinate Pinning
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                      Interactive Client Review
                    </h4>
                    <p className="text-xs text-black/60 leading-relaxed">
                      Files are rendered inside your portal. Clients click directly on design files to drop coordinate comment pins.
                    </p>
                  </div>

                  <div className="space-y-3 p-6 bg-white rounded-none border-l-2 border-black/20 pl-4">
                    <span className="block font-mono text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      03 / Revision Cycles
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                      Direct Developer Handshake
                    </h4>
                    <p className="text-xs text-black/60 leading-relaxed">
                      Our 3D specialists receive spatial points, reply back within the thread to coordinate edits, and upload version increments.
                    </p>
                  </div>

                  <div className="space-y-3 p-6 bg-white rounded-none border-l-2 border-black/20 pl-4">
                    <span className="block font-mono text-[10px] font-bold text-black/40 uppercase tracking-widest">
                      04 / Vault Handover
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
                      Instant Deliverables
                    </h4>
                    <p className="text-xs text-black/60 leading-relaxed">
                      Once all coordinates display as resolved green, final DXF dwg files and certified blueprints populate the Vault.
                    </p>
                  </div>

                </div>

                {/* Meet the Studio Architects */}
                <div className="pt-16 border-t border-[#E5E5E1] text-left space-y-8" id="about-team-members-section">
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-black/40 block font-bold">
                      The Craftsmen
                    </span>
                    <h3 className="font-display text-2xl font-light text-neutral-900">
                      Ant Studio Specialists
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="team-grid">
                    {TEAM_MEMBERS.map(member => (
                      <div key={member.id} className="flex items-center gap-4 p-4 bg-white rounded-none border border-[#E5E5E1] shadow-none">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="h-11 w-11 rounded-none object-cover border border-[#E5E5E1]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="leading-tight">
                          <span className="block text-xs font-bold text-black uppercase tracking-wider">{member.name}</span>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-black/40 block mt-0.5">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black text-white rounded-none p-8 sm:p-12 relative overflow-hidden text-left shadow-none border border-white/5" id="landing-cta-banner">
                  <div className="absolute inset-0 blueprint-grid-dark opacity-15 pointer-events-none" />
                  <div className="relative z-10 max-w-xl space-y-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
                      Ready to trace your build project coordinate by coordinate?
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                      Enter your project credentials to log into the visual drawing workbench. Switch roles in the navbar to test both the design studio and the client feedback cycle.
                    </p>
                    <button
                      onClick={() => setActiveTab('portal')}
                      className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-none transition-all duration-300 hover:bg-neutral-100 cursor-pointer text-[10px] uppercase tracking-widest font-sans"
                    >
                      Access the Interactive Studio Portal
                      <ArrowRight className="h-4 w-4 text-black" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

          </div>
        ) : (
          /* Client portal interactive sandbox */
          <div className="pb-16" id="portal-main-view">
            <ClientPortal 
              projects={projects} 
              setProjects={setProjects}
              mockRole={mockRole}
              clientName="Julian & Sarah"
            />

            {/* Clear Database resets */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 text-center" id="demo-controls-footer">
              <button
                onClick={handleResetDatabase}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase bg-neutral-200 hover:bg-neutral-300 text-neutral-600 hover:text-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-300/60"
              >
                Reset Workshop Simulation Records
              </button>
              <p className="text-[9px] text-neutral-400 mt-2 font-mono">
                Clears all custom coordinate pins, mock replies, and chat message structures saved in your browser cookie / localStorage cache.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Ground bottom footer footer */}
      <footer className="bg-white border-t border-neutral-200 py-12 text-center font-sans mt-auto" id="main-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-xs tracking-widest text-neutral-900 uppercase">
              ANT ARCHITECTURE © 2026
            </span>
            <span className="text-neutral-350 text-xs">|</span>
            <span className="text-[10px] font-mono text-neutral-400">
              UTC Local: 2026-06-19
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
            <span className="hover:text-red-650 cursor-pointer">3D Renderings</span>
            <span>•</span>
            <span className="hover:text-red-650 cursor-pointer">2D Architectural Drafts</span>
            <span>•</span>
            <span className="hover:text-red-650 cursor-pointer">Interior Detail Sets</span>
            <span>•</span>
            <span className="hover:text-red-650 cursor-pointer">Hydro-Garden Schematics</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
