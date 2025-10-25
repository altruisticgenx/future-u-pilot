import { LucideIcon, Lock, Zap, Beaker, FileText } from 'lucide-react';

export interface OpenProject {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  techStack: string[];
  githubUrl: string;
  stars: number;
  contributors: number;
  status: 'active' | 'archived';
  color: 'red' | 'yellow' | 'pink' | 'purple';
}

export const openProjects: OpenProject[] = [
  {
    id: 'pqc-pathfinder',
    name: 'PQC Pathfinder',
    icon: Lock,
    description: 'Post-Quantum Cryptography migration toolkit. Scans codebases for vulnerable algorithms and suggests NIST-compliant replacements.',
    techStack: ['Python', 'Rust', 'NIST PQC'],
    githubUrl: 'https://github.com/pa-quantum-lobby/pqc-pathfinder',
    stars: 847,
    contributors: 23,
    status: 'active',
    color: 'red'
  },
  {
    id: 'gridsense',
    name: 'GridSense',
    icon: Zap,
    description: 'Quantum-safe SCADA monitoring for energy grids. Real-time anomaly detection with quantum-resistant encryption.',
    techStack: ['Go', 'QKD', 'Time-series'],
    githubUrl: 'https://github.com/pa-quantum-lobby/gridsense',
    stars: 612,
    contributors: 18,
    status: 'active',
    color: 'yellow'
  },
  {
    id: 'medisim',
    name: 'MediSim',
    icon: Beaker,
    description: 'Quantum chemistry simulator for drug discovery. HIPAA-compliant pipeline with de-identified patient data integration.',
    techStack: ['Qiskit', 'PyTorch', 'FHIR'],
    githubUrl: 'https://github.com/pa-quantum-lobby/medisim',
    stars: 923,
    contributors: 31,
    status: 'active',
    color: 'pink'
  },
  {
    id: 'civictrace',
    name: 'CivicTrace',
    icon: FileText,
    description: 'Policy impact tracker. Diffs regulatory changes, scores impact on small businesses, generates plain-language briefs.',
    techStack: ['Node.js', 'NLP', 'React'],
    githubUrl: 'https://github.com/pa-quantum-lobby/civictrace',
    stars: 534,
    contributors: 15,
    status: 'active',
    color: 'purple'
  }
];
