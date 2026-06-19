/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Compass, FolderKanban, ShieldAlert, User, Briefcase } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  activeTab: 'landing' | 'portal';
  setActiveTab: (tab: 'landing' | 'portal') => void;
  mockRole: 'client' | 'architect';
  setMockRole: (role: 'client' | 'architect') => void;
  clientName: string;
}

export default function Navbar({ activeTab, setActiveTab, mockRole, setMockRole, clientName }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E5E1] bg-white" id="main-header">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Tagline */}
        <div 
          className="cursor-pointer" 
          onClick={() => setActiveTab('landing')}
          id="nav-logo-trigger"
        >
          <Logo size="md" showTagline={true} />
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="hidden md:flex space-x-2" id="primary-navigation">
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'landing'
                ? 'bg-neutral-100 text-black border border-black/10'
                : 'text-black/40 hover:text-black hover:bg-neutral-50'
            }`}
            id="nav-tab-landing"
          >
            <Compass className="h-3.5 w-3.5" />
            Studio & Portfolio
          </button>
          
          <button
            onClick={() => setActiveTab('portal')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 relative ${
              activeTab === 'portal'
                ? 'bg-black text-white'
                : 'text-black/40 hover:text-black hover:bg-neutral-50 border border-transparent'
            }`}
            id="nav-tab-portal"
          >
            <FolderKanban className="h-3.5 w-3.5" />
            Client Portal
            {activeTab !== 'portal' && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
              </span>
            )}
          </button>
        </nav>

        {/* Portal Controller / Role Sandbox switcher */}
        <div className="flex items-center gap-3" id="navbar-controls-panel">
          
          {/* Quick Sandbox Simulator Panel */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#F0F0EE] p-1 border border-[#E5E5E1]" id="sandbox-role-simulator">
            <span className="text-[9px] font-mono uppercase tracking-widest text-black/40 px-1.5 font-bold">
              ROLE:
            </span>
            <button
              onClick={() => setMockRole('client')}
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                mockRole === 'client'
                  ? 'bg-white text-black border border-[#E5E5E1] shadow-xs'
                  : 'text-black/40 hover:text-black'
              }`}
              title="View the board as the Client (e.g. drop feedback, request revisions)"
              id="role-switch-client"
            >
              <User className="h-3 w-3" />
              Client
            </button>
            <button
              onClick={() => setMockRole('architect')}
              className={`flex items-center gap-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                mockRole === 'architect'
                  ? 'bg-white text-black border border-[#E5E5E1] shadow-xs'
                  : 'text-black/40 hover:text-black'
              }`}
              title="View the board as the Architect (e.g. resolve feedback, post design updates)"
              id="role-switch-architect"
            >
              <Briefcase className="h-3 w-3" />
              Architect
            </button>
          </div>

          {/* Quick tab button for mobile layout */}
          <div className="flex md:hidden gap-1">
            <button
              onClick={() => setActiveTab(activeTab === 'landing' ? 'portal' : 'landing')}
              className="p-2 border border-[#E5E5E1] text-black hover:bg-neutral-50"
              id="mobile-tab-toggle"
              title="Toggle view"
            >
              <FolderKanban className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Active User Indicator */}
          <div className="flex items-center gap-2 border-l border-[#E5E5E1] pl-3" id="user-profile-badge">
            <div className="flex h-8 w-8 items-center justify-center bg-black text-[10px] font-bold text-white uppercase">
              {mockRole === 'client' ? clientName[0] : 'AR'}
            </div>
            <div className="hidden lg:block text-left leading-none">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-black">
                {mockRole === 'client' ? clientName : 'Alex Rivers'}
              </span>
              <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest block mt-0.5">
                {mockRole === 'client' ? 'Client' : 'Architect'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
