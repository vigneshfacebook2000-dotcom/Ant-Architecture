/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, Project, DesignFile } from './types';

// Let's import the actual generated images. We can also provide standard fallbacks in case there are any issues,
// but let's import the specific images that we generated!
import exteriorImg from './assets/images/exterior_render_1781869073689.jpg';
import interiorImg from './assets/images/interior_render_1781869087477.jpg';
import landscapeImg from './assets/images/landscape_render_1781869100707.jpg';

export const TEAM_MEMBERS = [
  { id: '1', name: 'Alex Rivers', role: 'Principal Architect & Director', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '2', name: 'Kaelen Vance', role: 'Lead 3D Visualization Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '3', name: 'Niko Chen', role: 'Senior Landscape Designer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: '4', name: 'Elena Rostova', role: 'Interior Architecture Lead', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150' }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'The Brutalist Cliffside-Villa',
    category: 'exterior',
    description: 'A masterclass in modern brutalism. Raw textured board-formed concrete offsets the warm tones of stained cedar wood, clinging dramatically to a steep slope over the Pacific ocean. Designed for passive thermodynamic cooling and optimal sunset capture.',
    imageSrc: exteriorImg,
    location: 'Big Sur, California',
    scope: ['3D Exterior Renderings', '2D Schematic Drafting', 'Structural Framework Analysis', 'Wind Shear Modeling']
  },
  {
    id: 'p2',
    title: 'Bouclé & Hearth Solarium',
    category: 'interior',
    description: 'A contemporary double-height open living space. A monumental monolithic concrete fireplace commands the center, while bespoke organic furniture upholstered in heavy cream bouclé delivers soft domestic tactile experiences.',
    imageSrc: interiorImg,
    location: 'Aspen, Colorado',
    scope: ['Interior Space Planning', 'Bespoke Furniture Layout', 'High-Fidelity 3D Renders', 'Lighting & Reflected Ceiling Plans']
  },
  {
    id: 'p3',
    title: 'The Piedmont Infinite Courtyard',
    category: 'landscape',
    description: 'An architectural garden courtyard built around a central linear infinity reflecting pool. Sculptural black bamboo blocks the northern winds, while geometric hand-cut charcoal porphyry pavers provide a structured ground plan.',
    imageSrc: landscapeImg,
    location: 'Tuscany, Italy',
    scope: ['Hydrological Site Studies', 'Precision Hardscape Layouts', 'Drought-Resilient Flora Selection', 'Nocturnal Accent Lighting Schemes']
  },
  {
    id: 'p4',
    title: 'Nara Forest Retreat',
    category: '3d',
    description: 'A speculative photorealistic 3D visualization exploring timber joinery and floating floorboards over natural moss meadows in central Japan, integrating high-fidelity shadow studies and morning dew refraction mapping.',
    imageSrc: exteriorImg, // Reuse beautifully
    location: 'Nara, Japan',
    scope: ['Volumetric Light Mapping', 'Wood Grain Texture Detailing', 'Interactive 3D Walkthrough Prep', 'V-Ray Landscape Scattering']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj1',
    name: 'Forest Edge Monolithic Villa',
    clientName: 'Julian & Sarah Vance',
    description: 'A modular luxury villa designed nestled inside a majestic Redwood grove. Special emphasis is placed on 3D daylight modeling, material sustainability, and precision 2D interior millwork templates.',
    address: '109 Redwood Ridge Dr, Mendocino CA',
    progress: 68,
    startDate: '2026-03-10',
    estimatedCompletion: '2026-11-20',
    currentPhase: 'renderings3d',
    phasesStatus: {
      concept: 'completed',
      drawings2d: 'completed',
      renderings3d: 'in-progress',
      construction: 'upcoming',
      completed: 'upcoming'
    },
    milestones: [
      { id: 'm1', name: 'Site Analysis & Volumetric Form Study', phase: 'concept', description: 'Evaluate slope drainage and sun tracks to optimize building placement.', status: 'completed', dueDate: '2026-03-25', completedDate: '2026-03-24' },
      { id: 'm2', name: '2D Architectural Drawings Submission', phase: 'drawings2d', description: 'Deliver initial structural floor plans, elevations, and structural boundaries.', status: 'completed', dueDate: '2026-05-02', completedDate: '2026-04-30' },
      { id: 'm3', name: 'Interior & Landscape Schematic Approval', phase: 'drawings2d', description: 'Review the layout of electrical outlets, furniture zoning, and hardscaping boundaries.', status: 'completed', dueDate: '2026-05-20', completedDate: '2026-05-22' },
      { id: 'm4', name: 'Main Exterior & Interior Renderings', phase: 'renderings3d', description: 'Draft raw 3D volumetric images with realistic cedar and concrete shadows.', status: 'in-progress', dueDate: '2026-06-30' },
      { id: 'm5', name: 'Landscape Hydro Plan & Plant Selection', phase: 'construction', description: 'Finalize native plant selections and hydrological drip patterns.', status: 'upcoming', dueDate: '2026-08-15' },
      { id: 'm6', name: 'Final Construction & Detailing Handover', phase: 'completed', description: 'Consolidate full engineering plans and 100% detail sets.', status: 'upcoming', dueDate: '2026-11-01' }
    ],
    designFiles: [
      {
        id: 'file1',
        name: 'Main Exterior Conceptual Render - West Face',
        category: '3d_visualization',
        url: exteriorImg, // use our beautifully generated images!
        description: 'Completed dusk rendering of the main Redwood-facing building panel, showing lighting, metal frame tolerances, and raw cedar wood finishes.',
        version: 'v2.4',
        updatedAt: '2026-06-12'
      },
      {
        id: 'file2',
        name: 'Oak & Concrete Living Room Blueprint',
        category: '2d_interior',
        url: interiorImg, // stunning interior image
        description: 'Reflective ceiling layout and custom cabinetry assembly detailing, covering primary kitchen island and fireplace clearance.',
        version: 'v1.12',
        updatedAt: '2026-06-15'
      },
      {
        id: 'file3',
        name: 'Perimeter Hardscape & Pool Alignment',
        category: '2d_landscape',
        url: landscapeImg, // stunning landscape pool image!
        description: '2D Landscape structural outline detailing native paving stone cuts, perimeter lights, and connection points for the water circulation pump.',
        version: 'v1.8',
        updatedAt: '2026-06-08'
      }
    ],
    feedbackPins: [
      {
        id: 'pin1',
        projectId: 'proj1',
        designFileId: 'file1',
        x: 35.6,
        y: 42.1,
        author: 'Julian Vance',
        authorRole: 'client',
        text: 'We really love the cedar shading. However, could we warm up the staining tint slightly to blend in better with the redwood trunks behind?',
        status: 'pending',
        severity: 'medium',
        createdAt: '2026-06-16T14:22:00Z',
        replies: [
          {
            id: 'rep1',
            author: 'Alex Rivers',
            authorRole: 'architect',
            text: 'Excellent suggestion, Julian! I agree that a deeper crimson-amber undertone would complement the natural grove colors beautifully. I’ll ask Kaelen to run a revised grain lighting test.',
            createdAt: '2026-06-17T09:12:00Z'
          }
        ]
      },
      {
        id: 'pin2',
        projectId: 'proj1',
        designFileId: 'file2',
        x: 65.2,
        y: 28.4,
        author: 'Sarah Vance',
        authorRole: 'client',
        text: 'Could we verify the clearance space around this island? We want to make sure two people can easily pass each other when preparing dinner.',
        status: 'acknowledged',
        severity: 'high',
        createdAt: '2026-06-15T18:05:00Z',
        replies: [
          {
            id: 'rep2',
            author: 'Elena Rostova',
            authorRole: 'architect',
            text: 'Absolutely, Sarah. We’ve allocated 1.35m (4.4 feet) of clear passageway on both sides, which is well above the standard residential standard of 1.0m. I will attach the technical dimensioned drawing.',
            createdAt: '2026-06-16T11:40:00Z'
          }
        ]
      },
      {
        id: 'pin3',
        projectId: 'proj1',
        designFileId: 'file1',
        x: 78.4,
        y: 65.0,
        author: 'Alex Rivers',
        authorRole: 'architect',
        text: 'We are recommending low-voltage warm copper downlights embedded along this lower fascia ledge to create a soft amber path glow.',
        status: 'resolved',
        severity: 'low',
        createdAt: '2026-06-13T09:00:00Z',
        replies: []
      }
    ],
    messages: [
      { id: 'msg1', author: 'Alex Rivers', authorRole: 'architect', text: 'Good morning Julian & Sarah. We have uploaded our latest structural iterations. The primary Focus of the week has been refining the 3D visuals of the Redwoods intersection. Take a look at File 1!', createdAt: '2026-06-12T10:00:00Z' },
      { id: 'msg2', author: 'Julian Vance', authorRole: 'client', text: 'Hi Alex! The West Face rendering looks breathtaking! We are honestly blown away by the lighting details. We dropped a few pin comments on the wood and kitchen cabinetry.', createdAt: '2026-06-13T16:30:00Z' },
      { id: 'msg3', author: 'Elena Rostova', authorRole: 'architect', text: 'Awesome, thank you Julian. I see your feedback on the fireplace marble cladding and island clearances. We are updating the dimensions on the CAD file and will sync back soon!', createdAt: '2026-06-14T11:15:00Z' }
    ]
  },
  {
    id: 'proj2',
    name: 'Oak & Clay Desert Pavilions',
    clientName: 'Nava Group Holdings',
    description: 'An expansive eco-retreat set in the high Mojave Desert, comprising six interconnected pavilions built from rammed earth and custom clay shingles.',
    address: '422 Smoke Tree Rd, Joshua Tree CA',
    progress: 35,
    startDate: '2026-05-01',
    estimatedCompletion: '2027-02-15',
    currentPhase: 'drawings2d',
    phasesStatus: {
      concept: 'completed',
      drawings2d: 'in-progress',
      renderings3d: 'upcoming',
      construction: 'upcoming',
      completed: 'upcoming'
    },
    milestones: [
      { id: 'm10', name: 'Desert Soil Compaction Study', phase: 'concept', description: 'Testing native sand and clay binder viability.', status: 'completed', dueDate: '2026-05-15', completedDate: '2026-05-12' },
      { id: 'm11', name: 'Rammed Earth Structural Floor Plan', phase: 'drawings2d', description: 'Design 50cm thick outer load-bearing rammed earth boundaries.', status: 'in-progress', dueDate: '2026-07-10' },
      { id: 'm12', name: 'Passive Solar Heat Storage Math', phase: 'drawings2d', description: 'Calculate winter heating buffers using thermal concrete floors.', status: 'upcoming', dueDate: '2026-08-01' }
    ],
    designFiles: [
      {
        id: 'file4',
        name: 'Mojave Pavilion Site Layout Schema',
        category: '2d_exterior',
        url: landscapeImg,
        description: 'Full perimeter boundaries overlaying standard seismic contour faults.',
        version: 'v0.9a',
        updatedAt: '2026-06-10'
      }
    ],
    feedbackPins: [],
    messages: [
      { id: 'msg10', author: 'Niko Chen', authorRole: 'client', text: 'Hello, we finished surveying the northern ridge. We should adjust the entry walkway to curve around the protected ancient ironwood tree.', createdAt: '2026-06-14T15:00:00Z' }
    ]
  }
];
