/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Project, DesignFile, FeedbackPin, Message, ProjectPhase, Milestone } from '../types';
import { TEAM_MEMBERS } from '../mockData';
import { 
  CheckCircle2, 
  Clock, 
  Plus, 
  MessageSquare, 
  CornerDownRight, 
  Paperclip, 
  Send, 
  AlertTriangle, 
  Maximize2, 
  Layers, 
  User, 
  Download, 
  Check, 
  CornerUpLeft,
  BookOpen,
  Calendar,
  Sparkles
} from 'lucide-react';

interface ClientPortalProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  mockRole: 'client' | 'architect';
  clientName: string;
}

export default function ClientPortal({ projects, setProjects, mockRole, clientName }: ClientPortalProps) {
  // Select active project
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj1');
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Select active design file for feedback review
  const [selectedFileId, setSelectedFileId] = useState<string>(
    activeProject?.designFiles[0]?.id || 'file1'
  );
  
  // Find current file object
  const activeFile = activeProject?.designFiles.find(f => f.id === selectedFileId) || activeProject?.designFiles[0];

  // Message chat input state
  const [chatInput, setChatInput] = useState('');
  
  // New Pin placement states
  const [isPlacingPin, setIsPlacingPin] = useState(false);
  const [hoverCoords, setHoverCoords] = useState<{ x: number, y: number } | null>(null);
  const [tempPin, setTempPin] = useState<{ x: number, y: number } | null>(null);
  const [pinText, setPinText] = useState('');
  const [pinSeverity, setPinSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Inspect single pin details
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Sync activeFile if project changes
  useEffect(() => {
    if (activeProject && activeProject.designFiles.length > 0) {
      setSelectedFileId(activeProject.designFiles[0].id);
      setActivePinId(null);
      setIsPlacingPin(false);
      setTempPin(null);
    }
  }, [selectedProjectId]);

  if (!activeProject) {
    return <div className="p-8 text-center text-neutral-500">No active structures compiled.</div>;
  }

  // Phase order for mapping
  const phases: { key: ProjectPhase; label: string; desc: string }[] = [
    { key: 'concept', label: '1. Concept & Volume', desc: 'Site analyses & raw 3D masses' },
    { key: 'drawings2d', label: '2. Schematic Drawings', desc: '2D Floorplans, exterior elevation drafts & structural layouts' },
    { key: 'renderings3d', label: '3. 3D Visualizations', desc: '8K Photorealistic shade, materiality & lighting environments' },
    { key: 'construction', label: '4. Detail sets', desc: 'Engineering joinery, planting maps, and water plans' },
    { key: 'completed', label: '5. Finished Handover', desc: 'Final certified build-sets and signoff' }
  ];

  // Handle posting chat messaging
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      author: mockRole === 'client' ? clientName : 'Alex Rivers',
      authorRole: mockRole,
      text: chatInput,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          messages: [...p.messages, newMessage]
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    setChatInput('');

    // Simulated responsive feedback from architect/client bot after a short timeout to feel collaborative
    setTimeout(() => {
      const isClientPost = mockRole === 'client';
      const botResponse: Message = {
        id: `msg-bot-${Date.now()}`,
        author: isClientPost ? 'Alex Rivers' : clientName,
        authorRole: isClientPost ? 'architect' : 'client',
        text: isClientPost 
          ? `Thank you for your response. Our lead visualization team has received your message and is adjusting the CAD deliverables. We will update the progression tracker here in the portal.`
          : `Thanks for the update, Alex! This looks fantastic and very clear. We will review this evening with our interior decorators.`,
        createdAt: new Date().toISOString()
      };

      setProjects(prevProjects => prevProjects.map(p => {
        if (p.id === activeProject.id) {
          return {
            ...p,
            messages: [...p.messages, botResponse]
          };
        }
        return p;
      }));
    }, 1500);
  };

  // Click on image container to initiate feedback pin placement
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    // Calculate percentage coords
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsPlacingPin(true);
    setTempPin({ x, y });
    setActivePinId(null);
  };

  // Submit coordinate pin comment
  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempPin || !pinText.trim()) return;

    const newPin: FeedbackPin = {
      id: `pin-${Date.now()}`,
      projectId: activeProject.id,
      designFileId: selectedFileId,
      x: parseFloat(tempPin.x.toFixed(2)),
      y: parseFloat(tempPin.y.toFixed(2)),
      author: mockRole === 'client' ? clientName : 'Alex Rivers',
      authorRole: mockRole,
      text: pinText,
      status: 'pending',
      severity: pinSeverity,
      createdAt: new Date().toISOString(),
      replies: []
    };

    const updatedProjects = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          feedbackPins: [...p.feedbackPins, newPin]
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    setPinText('');
    setTempPin(null);
    setIsPlacingPin(false);
    setActivePinId(newPin.id); // auto select newly created pin
  };

  // Reply to an existing feedback pin thread
  const handleAddReply = (e: React.FormEvent, pinId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: mockRole === 'client' ? clientName : 'Alex Rivers',
      authorRole: mockRole,
      text: replyText,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          feedbackPins: p.feedbackPins.map(pin => {
            if (pin.id === pinId) {
              return {
                ...pin,
                replies: [...pin.replies, newReply]
              };
            }
            return pin;
          })
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    setReplyText('');
  };

  // Update feeding pin status (e.g. resolve it)
  const handleUpdatePinStatus = (pinId: string, status: 'resolved' | 'acknowledged' | 'pending') => {
    const updatedProjects = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          feedbackPins: p.feedbackPins.map(pin => {
            if (pin.id === pinId) {
              return { ...pin, status };
            }
            return pin;
          })
        };
      }
      return p;
    });
    setProjects(updatedProjects);
  };

  // Delete a pin thread
  const handleDeletePin = (pinId: string) => {
    const updatedProjects = projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          feedbackPins: p.feedbackPins.filter(pin => pin.id !== pinId)
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    setActivePinId(null);
  };

  // Count active pins on current selected file
  const pinsOnCurrentFile = activeProject.feedbackPins.filter(pin => pin.designFileId === selectedFileId);

  return (
    <div className="bg-neutral-50 min-h-screen py-8" id="client-portal-root">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Portal top banner panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6" id="portal-header">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-neutral-900 text-white rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-red-500 animate-spin" />
              Secure Client Workspace
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              Ant Design Portal & Feedback Hub
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
              Track project progression phases, inspect detailed 2D CAD blueprints & 3D renders, and drop context coordinates on designs to coordinate revisions.
            </p>
          </div>

          {/* Project Picker dropdown selector */}
          <div className="space-y-1.5" id="project-selector-wrapper">
            <label className="block font-mono text-[9px] uppercase text-black/40 font-bold">
              Active Project File:
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-white text-black text-xs font-semibold rounded-none border border-[#E5E5E1] py-2 px-3 pr-8 focus:border-black outline-none cursor-pointer font-mono uppercase tracking-wider"
              id="active-project-picker"
            >
              {projects.map(proj => (
                <option key={proj.id} value={proj.id}>
                  {proj.name} ({proj.clientName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. PROGRESSION TIMELINE STRIP */}
        <div className="bg-white rounded-none p-6 sm:p-8 border border-[#E5E5E1] shadow-none space-y-6" id="progress-tracker-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E1] pb-4">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-black/40 font-bold block">Status Tracking //</span>
              <h2 className="font-display text-lg font-light tracking-tight text-[#1A1A1A] flex items-center gap-2">
                Spatio-Temporal Progress Tracker
              </h2>
              <p className="text-xs text-black/40 font-mono text-[10px]">
                CURRENT PHASE: <span className="font-bold underline text-[#1A1A1A] capitalize">{activeProject.currentPhase}</span> • EST. DELIVERY {activeProject.estimatedCompletion}
              </p>
            </div>
            
            {/* Elegant physical progress indicator */}
            <div className="flex items-center gap-3" id="progress-numerical-radial">
              <div className="text-right leading-none">
                <span className="block text-2xl font-light font-display text-black">
                  {activeProject.progress}%
                </span>
                <span className="text-[8px] font-mono uppercase text-black/40">
                  Completed milestones
                </span>
              </div>
              <div className="w-24 h-1 bg-[#F0F0EE] rounded-none overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-500" 
                  style={{ width: `${activeProject.progress}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Timeline phase steppers */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative" id="timeline-stepper-grid">
            
            {/* Visual connector line in between boxes on desktop */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-px bg-[#E5E5E1] z-0" />

            {phases.map((ph, idx) => {
              const status = activeProject.phasesStatus[ph.key];
              const isCompleted = status === 'completed';
              const isInProgress = status === 'in-progress';

              return (
                <div 
                  key={ph.key} 
                  className={`relative z-10 flex flex-col items-center text-center p-4 rounded-none border transition-all ${
                    isInProgress 
                      ? 'bg-[#F9F9F7] border-black text-black' 
                      : isCompleted 
                        ? 'bg-white border-[#E5E5E1] text-black/70' 
                        : 'bg-white border-dashed border-[#E5E5E1] text-black/35'
                  }`}
                  id={`phase-step-${ph.key}`}
                >
                  {/* Phase bubble state representing status */}
                  <div className={`h-8 w-8 rounded-none flex items-center justify-center text-xs font-mono mb-3 border ${
                    isInProgress 
                      ? 'bg-black text-white border-black font-bold' 
                      : isCompleted 
                        ? 'bg-white text-black border-black font-bold' 
                        : 'bg-white text-black/40 border-[#E5E5E1]'
                  }`}>
                    {isCompleted ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                  </div>

                  <span className="block text-xs font-bold leading-tight font-display uppercase tracking-wider">
                    {ph.label}
                  </span>
                  
                  <span className={`block text-[10px] leading-tight mt-1 ${isInProgress ? 'text-black/80' : 'text-black/40'}`}>
                    {ph.desc}
                  </span>

                  {/* Tiny badge indicating state */}
                  <span className={`inline-block text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-none mt-3 ${
                    isInProgress 
                      ? 'bg-black text-white font-bold' 
                      : isCompleted 
                        ? 'bg-[#F0F0EE] text-black/60 border border-[#E5E5E1]' 
                        : 'bg-[#F9F9F7] text-black/30'
                  }`}>
                    {status}
                  </span>
                </div>
              );
            })}

          </div>

          {/* Sub-milestones checklist dropdown display */}
          <div className="bg-[#F9F9F7] rounded-none p-5 border border-[#E5E5E1]" id="sub-milestones-checklist">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E5E5E1]">
              <span className="font-mono text-[9px] uppercase text-black/45 font-bold">
                Meticulous CAD Drafting & Visualization Checklist:
              </span>
              <span className="text-[10px] font-mono text-black/50">
                {activeProject.milestones.filter(m => m.status === 'completed').length} / {activeProject.milestones.length} approved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProject.milestones.map(m => (
                <div 
                  key={m.id} 
                  className="flex items-start gap-3 bg-white p-4 rounded-none border border-[#E5E5E1] shadow-none text-left"
                >
                  <div className="mt-0.5 shrink-0">
                    {m.status === 'completed' ? (
                      <div className="h-4.5 w-4.5 rounded-none bg-black text-white flex items-center justify-center">
                        <Check className="h-3 w-3" />
                      </div>
                    ) : m.status === 'in-progress' ? (
                      <div className="h-4.5 w-4.5 rounded-none border border-black flex items-center justify-center animate-pulse">
                        <Clock className="h-3 w-3 text-black" />
                      </div>
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-none border border-[#E5E5E1] flex" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <span className={`block text-xs font-semibold ${m.status === 'completed' ? 'text-black/40 line-through' : 'text-black'}`}>
                      {m.name}
                    </span>
                    <p className="text-[10px] text-black/50 leading-relaxed font-sans">
                      {m.description}
                    </p>
                    <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-black/40">
                      <span className="uppercase font-bold text-black/60 bg-[#F9F9F7] px-1.5 py-0.5 border border-[#E5E5E1]">
                        {m.phase}
                      </span>
                      <span>• Due: {m.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN DESIGN REVIEW BOARD & COMMUNICATIONS CHANNEL SCREEN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="collab-board-channel">
          
          {/* L. THE INTERACTIVE COORDINATE REVIEW CANVAS (COL-S-8) */}
          <div className="lg:col-span-8 bg-white rounded-none p-6 sm:p-8 border border-[#E5E5E1] shadow-none space-y-6 text-left" id="design-canvas-column">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E1] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 block font-bold">Interactive Review //</span>
                <h3 className="font-display text-lg font-light tracking-tight text-neutral-950 flex items-center gap-2">
                  Drawing Review & Spatial Feedback Pinning
                </h3>
                <p className="text-xs text-black/50 font-sans">
                  Select a document revision below. Click on any point on the sheet to place a feedback pin.
                </p>
              </div>

              {/* Pinning instructions helper */}
              <div className="inline-flex items-center gap-1.5 bg-[#F9F9F7] text-black border border-[#E5E5E1] rounded-none px-3 py-1.5 text-xs font-mono font-bold" id="coordinate-pin-help">
                <span className="flex h-1.5 w-1.5 bg-black animate-pulse"></span>
                <span>PINS LOGGED: {pinsOnCurrentFile.length}</span>
              </div>
            </div>

            {/* Design Revisions Layer Tabs */}
            <div className="flex flex-wrap gap-2.5" id="canvas-document-selector">
              {activeProject.designFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    setSelectedFileId(file.id);
                    setActivePinId(null);
                    setIsPlacingPin(false);
                    setTempPin(null);
                  }}
                  className={`px-4 py-3 text-xs font-semibold rounded-none border transition-all text-left flex items-start gap-3.5 cursor-pointer ${
                    selectedFileId === file.id
                      ? 'bg-black text-white border-black shadow-none'
                      : 'bg-white text-black/60 hover:text-black border-[#E5E5E1] hover:border-black'
                  }`}
                  id={`btn-select-file-${file.id}`}
                >
                  <div className="space-y-0.5">
                    <span className="block font-mono text-[9px] uppercase tracking-wider opacity-60">
                      {file.category.replace('_', ' ')} • {file.version}
                    </span>
                    <span className="block font-display text-xs uppercase tracking-wide">
                      {file.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* File info banner */}
            {activeFile && (
              <div className="bg-[#F9F9F7] border border-[#E5E5E1] p-5 rounded-none flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] uppercase bg-black text-white font-bold tracking-wider px-2 py-0.5 rounded-none">
                    CAD Layer Specs
                  </span>
                  <p className="text-xs text-black/75">
                    <span className="font-semibold text-[#1A1A1A]">{activeFile.name} (Rev {activeFile.version})</span> — {activeFile.description}
                  </p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end justify-between font-mono text-[10px] text-[#1A1A1A]/50 shrink-0">
                  <span>Updated: {activeFile.updatedAt}</span>
                  <span className="text-black font-semibold hover:underline cursor-pointer flex items-center gap-1 pt-1">
                    <Download className="h-3 w-3" />
                    Download RAW DXF
                  </span>
                </div>
              </div>
            )}

            {/* THE VISUAL CANVAS CONTAINER WITH PIN DROPING COORDS */}
            <div className="relative space-y-4" id="canvas-drawing-view">
              
              {/* Dynamic warning banner about placing state */}
              {tempPin && (
                <div className="bg-[#1A1A1A] text-white text-xs py-2.5 px-4 rounded-none border border-black flex items-center justify-between" id="temp-pin-warning">
                  <span className="font-mono uppercase text-[10px] tracking-wider">
                    📍 Placement Coordinates: X {tempPin.x.toFixed(1)}% , Y {tempPin.y.toFixed(1)}%
                  </span>
                  <button 
                    onClick={() => { setTempPin(null); setIsPlacingPin(false); }} 
                    className="text-white underline font-bold text-[10px] uppercase tracking-wider py-0.5 px-2 hover:bg-white/10 rounded-none cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div 
                ref={imageContainerRef}
                onClick={handleImageClick}
                className="relative bg-neutral-950 rounded-none overflow-hidden cursor-crosshair border border-black select-none group"
                id="interactive-canvas-frame"
              >
                {/* Visual grid pattern on top of CAD drawings (blueprint) */}
                <div className="absolute inset-0 blueprint-grid opacity-20 z-10 pointer-events-none" />

                {/* Main draft render image */}
                {activeFile && (
                  <img
                    src={activeFile.url}
                    alt={activeFile.name}
                    className="w-full h-auto object-cover max-h-[550px] mx-auto opacity-90 transition-opacity group-hover:opacity-100 duration-300"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Absolute Rendered Pin Elements */}
                {pinsOnCurrentFile.map((pin) => {
                  const isActive = activePinId === pin.id;
                  const severityColors = {
                    low: 'bg-black border-[#E5E5E1]',
                    medium: 'bg-[#1A1A1A] border-[#E5E5E1]',
                    high: 'bg-black border-red-500'
                  };

                  return (
                    <button
                      key={pin.id}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent adding new pin on top
                        setActivePinId(pin.id);
                        setTempPin(null);
                        setIsPlacingPin(false);
                      }}
                      className={`absolute z-20 hover:scale-110 transition-transform duration-200 pointer-events-auto rounded-none text-[9px] text-white flex items-center justify-center font-mono ${
                        isActive 
                          ? 'h-8 w-8 bg-black border border-white pulsing-pin' 
                          : `h-6 w-6 ${severityColors[pin.severity]} border border-white shadow-none`
                      }`}
                      style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                      id={`canvas-landmark-pin-${pin.id}`}
                      title={`${pin.author} (${pin.severity}): ${pin.text}`}
                    >
                      {/* Show pin initial status inside */}
                      {pin.status === 'resolved' ? (
                        <Check className="h-3 w-3 text-white" />
                      ) : (
                        <span>{pin.id.slice(-2).toUpperCase()}</span>
                      )}
                    </button>
                  );
                })}

                {/* Temporary pin preview */}
                {tempPin && (
                  <div
                    className="absolute z-30 h-8 w-8 rounded-none bg-black border border-white shadow-none flex items-center justify-center font-bold text-white text-[11px]"
                    style={{ top: `${tempPin.y}%`, left: `${tempPin.x}%` }}
                  >
                    +
                  </div>
                )}
              </div>

              {/* Instructions banner */}
              <div className="flex items-center gap-2 bg-[#F9F9F7] p-3 rounded-none border border-[#E5E5E1] text-[10px] text-black/60 font-mono">
                <span className="font-bold uppercase text-black bg-white border border-[#E5E5E1] px-1.5 py-0.5 rounded-none font-mono">
                  INFO
                </span>
                <span>Click directly on the image coordinate layer to drop a coordinate landmark feedback pin.</span>
              </div>

            </div>

            {/* DYNAMIC FORM TO LOG NEW PIN COMMENT */}
            {isPlacingPin && tempPin && (
              <form 
                onSubmit={handleSavePin} 
                className="bg-[#F9F9F7] p-6 rounded-none border border-[#E5E5E1] space-y-4 text-left shadow-none transition-all animate-in fade-in"
                id="layout-pin-form"
              >
                <div className="flex items-center justify-between border-b border-[#E5E5E1] pb-2">
                  <h4 className="font-display font-medium text-black text-sm uppercase tracking-wider">
                    📍 Coordinates logged: X {tempPin.x.toFixed(1)}% , Y {tempPin.y.toFixed(1)}%
                  </h4>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-black/40 font-bold">
                    [Coordinate Registry Form]
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
                      Severity Priority:
                    </label>
                    <div className="flex gap-2">
                      {(['low', 'medium', 'high'] as const).map(sev => (
                        <button
                          key={sev}
                          type="button"
                          onClick={() => setPinSeverity(sev)}
                          className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-none border transition-all cursor-pointer ${
                            pinSeverity === sev
                              ? 'bg-black border-black text-white'
                              : 'bg-white border-[#E5E5E1] text-black/50 hover:border-black'
                          }`}
                        >
                          {sev}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
                      Feedback Author:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={mockRole === 'client' ? `${clientName} (Client)` : 'Alex Rivers (Lead Architect)'}
                      className="w-full bg-[#F0F0EE] border border-[#E5E5E1] rounded-none p-2 text-xs text-black/60 font-mono uppercase tracking-wider"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
                    Detailed Coordinate Comment:
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={pinText}
                    onChange={(e) => setPinText(e.target.value)}
                    placeholder="Describe detail specifications: e.g. 'Can we swap these concrete pavers for dark basalt slate slabs?'"
                    className="w-full bg-white border border-[#E5E5E1] p-2.5 text-xs rounded-none focus:border-black outline-none font-sans"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlacingPin(false);
                      setTempPin(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-black uppercase tracking-widest bg-white border border-[#E5E5E1] rounded-none hover:border-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-none uppercase tracking-widest cursor-pointer border border-black"
                  >
                    Commit Pin
                  </button>
                </div>
              </form>
            )}

            {/* SHOW COMMENTS CARDS DETAILED BELOW */}
            <div className="space-y-4 pt-4 border-t border-[#E5E5E1]" id="comments-list-section">
              <span className="block font-mono text-[9px] uppercase text-black/40 font-bold tracking-widest">
                LOGGED PIN SPECS ON THIS REVISION ({pinsOnCurrentFile.length}):
              </span>

              {pinsOnCurrentFile.length === 0 ? (
                <div className="p-8 text-center text-xs text-black/40 bg-[#F9F9F7] rounded-none border border-dashed border-[#E5E5E1] font-sans">
                  No layout coordinates logged on this layer. Click the image draft above to place a landmark pin.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pinsOnCurrentFile.map((pin) => {
                    const isSelected = activePinId === pin.id;
                    return (
                      <div
                        key={pin.id}
                        onClick={() => setActivePinId(pin.id)}
                        className={`p-4 rounded-none text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-none ring-1 ring-white/10'
                            : 'bg-[#F9F9F7] text-black border-[#E5E5E1] hover:border-black'
                        }`}
                        id={`feedback-list-item-${pin.id}`}
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-none ${
                              isSelected
                                ? 'bg-white/10 text-white'
                                : 'bg-[#E5E5E1] text-black'
                            }`}>
                              {pin.severity}
                            </span>
                            <span className={`text-[9px] font-mono ${isSelected ? 'text-white/60' : 'text-black/40'}`}>
                              X: {pin.x.toFixed(1)}% Y: {pin.y.toFixed(1)}%
                            </span>
                          </div>
                          
                          {/* Pin Status Label */}
                          <span className={`text-[9px] font-mono capitalize px-2 py-0.5 rounded-none ${
                            pin.status === 'resolved'
                              ? 'bg-emerald-950 text-emerald-300'
                              : 'bg-amber-950 text-amber-300'
                          }`}>
                            {pin.status}
                          </span>
                        </div>

                        <p className="text-xs font-sans leading-relaxed">
                          "{pin.text}"
                        </p>

                        <div className="flex items-center justify-between text-[10px] mt-3 pt-2 border-t border-black/5 text-[#1A1A1A]/40">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-semibold ${isSelected ? 'text-white/65' : 'text-black/60'}`}>{pin.author}</span>
                          </div>
                          <span className={isSelected ? 'text-white/40' : 'text-black/30'}>{new Date(pin.createdAt).toLocaleDateString()}</span>
                        </div>

                        {/* Thread length summary indicator */}
                        {pin.replies.length > 0 && (
                          <div className={`mt-2.5 flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider ${isSelected ? 'text-[#F9F9F7]' : 'text-black'}`}>
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{pin.replies.length} developer reply</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ACTIVE SELECTED PIN DETAIL AND THREAD COMPONENT */}
            {activePinId && (
              (() => {
                const pin = activeProject.feedbackPins.find(p => p.id === activePinId);
                if (!pin) return null;
                return (
                  <div 
                    className="bg-neutral-55 border border-neutral-300 p-6 rounded-3xl space-y-4 text-left shadow-xs"
                    id="active-pin-full-thread"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[9px] uppercase hover:underline cursor-pointer" onClick={() => setActivePinId(null)}>
                          ← Back to coordinate listing
                        </span>
                        <h4 className="font-display font-bold text-neutral-900 text-sm">
                          📍 Thread Coordinate Details (Pin at X {pin.x}%, Y {pin.y}%)
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Resolve controls depending on Sandbox Simulated Role */}
                        {mockRole === 'architect' && pin.status !== 'resolved' && (
                          <button
                            onClick={() => handleUpdatePinStatus(pin.id, 'resolved')}
                            className="bg-emerald-900 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-emerald-950 flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" /> Mark Resolved
                          </button>
                        )}
                        {mockRole === 'architect' && pin.status === 'resolved' && (
                          <button
                            onClick={() => handleUpdatePinStatus(pin.id, 'pending')}
                            className="bg-neutral-200 text-neutral-700 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-neutral-300"
                          >
                            Re-Open Thread
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePin(pin.id)}
                          className="bg-red-50 text-red-700 hover:bg-red-100 text-[10px] font-bold uppercase py-1.5 px-2.5 rounded-lg"
                          title="Delete pin"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-150 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span className="font-bold text-neutral-800">{pin.author} ({pin.authorRole}) logged:</span>
                        <span>{new Date(pin.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs text-neutral-700 italic">
                        "{pin.text}"
                      </p>
                    </div>

                    {/* Replies Thread list */}
                    {pin.replies.length > 0 && (
                      <div className="space-y-3 pl-4 border-l-2 border-neutral-200">
                        {pin.replies.map(rep => (
                          <div key={rep.id} className="bg-white/80 p-3 rounded-lg border border-neutral-150 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400">
                              <span className="font-bold text-neutral-800">{rep.author} ({rep.authorRole}):</span>
                              <span>{new Date(rep.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-neutral-600">
                              {rep.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Form to submit reply */}
                    <form 
                      onSubmit={(e) => handleAddReply(e, pin.id)}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        required
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${pin.author}...`}
                        className="flex-1 bg-white border border-neutral-250 rounded-xl p-2 px-3 text-xs focus:ring-1 focus:ring-red-500 outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-neutral-900 hover:bg-neutral-800 font-semibold text-white px-4 py-2 rounded-xl text-xs"
                      >
                        Send Reply
                      </button>
                    </form>

                  </div>
                );
              })()
            )}
          {/* R. PROJECT GENERAL CHAT & MESSENGER (COL-S-4) */}
          <div className="lg:col-span-4 bg-white rounded-none p-6 border border-[#E5E5E1] shadow-none flex flex-col justify-between text-left space-y-6" id="messenger-column">
            
            <div className="space-y-4 border-b border-[#E5E5E1] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 block font-bold">Contract Dialogue //</span>
                <h3 className="font-display text-base font-bold text-neutral-900 uppercase tracking-wider">
                  Meticulous Project Messenger
                </h3>
                <p className="text-[10px] text-black/55 leading-normal font-sans">
                  Live architectural dialog ledger between the {clientName} board and the Lead Architect studio.
                </p>
              </div>

              {/* Sandbox info tip */}
              <div className="bg-[#F9F9F7] p-3 rounded-none border border-[#E5E5E1] text-[10px] text-black/60 leading-normal font-mono">
                💡 Toggling the <span className="font-bold text-black">Simulator Role</span> in the navbar changes your messaging identity. Try it to type as both sides of the contract!
              </div>
            </div>

            {/* Discussion history window height bounds */}
            <div 
              className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4 p-3 bg-[#F9F9F7] rounded-none border border-[#E5E5E1]"
              id="messages-scroll-well"
            >
              {activeProject.messages.map((message) => {
                const isMe = (mockRole === 'client' && message.authorRole === 'client') || 
                             (mockRole === 'architect' && message.authorRole === 'architect');

                return (
                  <div 
                    key={message.id} 
                    className={`flex flex-col gap-1 max-w-[85%] ${isMe ? 'ml-auto' : 'mr-auto'}`}
                  >
                    {/* Meta info header */}
                    <span className="text-[9px] font-mono text-black/40 uppercase tracking-widest block">
                      {message.author} • {message.authorRole}
                    </span>

                    {/* Chat Bubble container */}
                    <div className={`p-3 rounded-none text-xs leading-normal font-sans text-left border ${
                      isMe 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-[#1A1A1A] border-[#E5E5E1]'
                    }`}>
                      {message.text}
                    </div>

                    <span className="text-[8px] font-mono text-black/40">
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat submit layout panel */}
            <form onSubmit={handleSendMessage} className="space-y-2 pt-2 border-t border-[#E5E5E1]">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-black/40 mb-1">
                <span>Active Sender:</span>
                <span className="font-bold text-black uppercase">
                  {mockRole === 'client' ? clientName : 'Alex Rivers'}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Drop a note regarding coordinates..."
                  className="flex-1 bg-white border border-[#E5E5E1] rounded-none p-2.5 px-4 text-xs focus:border-black outline-none font-sans"
                  id="messenger-entry-box"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white p-2.5 rounded-none flex items-center justify-center transition-all cursor-pointer border border-black shadow-none"
                  id="messenger-send-trigger"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

          </div>

          </div>

        </div>

        {/* BRIGHT METICULOUS FILE AND DELIVERABLE DOWNLOADS CENTER */}
        <div className="bg-white rounded-none p-6 sm:p-8 border border-[#E5E5E1] shadow-none text-left space-y-6" id="client-file-center">
          <div className="space-y-1 border-b border-[#E5E5E1] pb-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 block font-bold">Document Archive //</span>
            <h3 className="font-display text-lg font-light tracking-tight text-neutral-900 uppercase tracking-wide">
              Official Engineering & Visualization File Vault
            </h3>
            <p className="text-xs text-black/50">
              All listed deliverables can be reviewed below. File links point to fully validated models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeProject.designFiles.map((file) => (
              <div 
                key={file.id}
                className="bg-[#F9F9F7] hover:bg-[#F0F0EE] transition-colors p-5 rounded-none border border-[#E5E5E1] text-left flex flex-col justify-between h-full space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase bg-black text-white tracking-widest font-bold px-2 py-0.5 rounded-none">
                      {file.category.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-black/40">
                      Rev {file.version}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-black text-sm leading-tight uppercase tracking-wider">
                    {file.name}
                  </h4>
                  <p className="text-xs text-black/60 leading-normal font-sans">
                    {file.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E5E1] flex items-center justify-between">
                  <div className="font-mono text-[9px] text-[#1A1A1A]/40">
                    <span>Uploaded: {file.updatedAt}</span>
                  </div>
                  <button 
                    onClick={() => {
                      alert(`Initiating verified transfer of revision ${file.version} high-res deliverables bundle...`);
                    }}
                    className="bg-black hover:bg-neutral-800 border border-black text-white font-bold font-sans text-[9px] uppercase tracking-widest py-1.5 px-3.5 rounded-none flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="h-3 w-3" /> Get DXF/DWG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
