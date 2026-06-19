/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectPhase = 'concept' | 'drawings2d' | 'renderings3d' | 'construction' | 'completed';

export interface Milestone {
  id: string;
  name: string;
  phase: ProjectPhase;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dueDate: string;
  completedDate?: string;
}

export interface FeedbackReply {
  id: string;
  author: string;
  authorRole: 'client' | 'architect';
  text: string;
  createdAt: string;
}

export interface FeedbackPin {
  id: string;
  projectId: string;
  designFileId: string;
  x: number; // percentage coordinate on image (0-100)
  y: number; // percentage coordinate on image (0-100)
  author: string;
  authorRole: 'client' | 'architect';
  text: string;
  status: 'pending' | 'resolved' | 'acknowledged';
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  replies: FeedbackReply[];
}

export interface DesignFile {
  id: string;
  name: string;
  category: '3d_visualization' | '2d_interior' | '2d_exterior' | '2d_landscape';
  url: string;
  description: string;
  version: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  author: string;
  authorRole: 'client' | 'architect';
  text: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  description: string;
  address: string;
  progress: number; // percentage (0-100)
  startDate: string;
  estimatedCompletion: string;
  currentPhase: ProjectPhase;
  phasesStatus: Record<ProjectPhase, 'completed' | 'in-progress' | 'upcoming'>;
  milestones: Milestone[];
  designFiles: DesignFile[];
  feedbackPins: FeedbackPin[];
  messages: Message[];
  coverImage?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: '3d' | 'interior' | 'exterior' | 'landscape';
  description: string;
  imageSrc: string;
  location: string;
  scope: string[];
}
