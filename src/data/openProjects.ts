import { Lock, Zap, Flask, FileText } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface OpenProject {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  techStack: string[];
  githubUrl: string;
  stars: number;
  contributors: number;
  status: 'active' | 'pilot' | 'research';
  color: string;
}

export const openProjects: OpenProject[] = [
  {
    id: 'pqc-pathfinder',
    name: 'PQC Pathfinder',
    icon: Lock,
    description: 'NIST-aligned post-quantum cryptography migration kits for Pennsylvania municipalities and SMEs.',
    techStack: ['NIST', 'Python', 'Cryptography', 'API'],
    githubUrl: 'https://github.com/altruisticxai/pqc-pathfinder',
    stars: 127,
    contributors: 8,
    status: 'active',
    color: 'from-red-500/15 via-pink-500/10 to-red-500/15'
  },
  {
    id: 'gridsense',
    name: 'GridSense',
    icon: Zap,
    description: 'AI-powered demand forecasting and grid optimization with fully explainable outputs and real-time data integration.',
    techStack: ['PJM API', 'TensorFlow', 'React', 'Explainable AI'],
    githubUrl: 'https://github.com/altruisticxai/gridsense',
    stars: 94,
    contributors: 12,
    status: 'pilot',
    color: 'from-yellow-500/15 via-orange-500/10 to-yellow-500/15'
  },
  {
    id: 'medisim',
    name: 'MediSim',
    icon: Flask,
    description: 'Molecular simulation workflows with HIPAA-compliant de-identification pipelines and quantum-ready drug discovery tools.',
    techStack: ['Qiskit', 'FHIR', 'Python', 'Quantum'],
    githubUrl: 'https://github.com/altruisticxai/medisim',
    stars: 82,
    contributors: 6,
    status: 'research',
    color: 'from-pink-500/15 via-rose-500/10 to-pink-500/15'
  },
  {
    id: 'civictrace',
    name: 'CivicTrace',
    icon: FileText,
    description: 'Policy diffing engine, impact modeling, and plain-language brief generation for Pennsylvania quantum governance.',
    techStack: ['NLP', 'Policy API', 'TypeScript', 'AI'],
    githubUrl: 'https://github.com/altruisticxai/civictrace',
    stars: 156,
    contributors: 14,
    status: 'active',
    color: 'from-purple-500/15 via-indigo-500/10 to-purple-500/15'
  }
];
