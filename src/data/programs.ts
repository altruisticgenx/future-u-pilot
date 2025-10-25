import { LucideIcon, Briefcase, GraduationCap, Shield, Scale } from 'lucide-react';

export interface Program {
  id: string;
  icon: LucideIcon;
  title: string;
  badge: {
    text: string;
    variant: 'draft' | 'live';
  };
  summary: string;
  details: string;
  ctaText: string;
  ctaLink: string;
}

export const programs: Program[] = [
  {
    id: 'advisory-board',
    icon: Briefcase,
    title: 'Quantum Initiative Advisory Board',
    badge: {
      text: 'Draft Model',
      variant: 'draft'
    },
    summary: 'Cross-sector panel to draft measurable goals, vet pilot projects, and publish quarterly progress reports.',
    details: `The Advisory Board brings together academic researchers, industry engineers, government officials, and community representatives to set strategic direction for Pennsylvania's quantum initiatives.

Key responsibilities:
• Draft annual strategic plans with measurable KPIs
• Evaluate and prioritize pilot projects based on public benefit
• Publish quarterly progress reports with transparent metrics
• Coordinate with federal quantum initiatives (NQIA, NSF)
• Ensure equitable access to quantum education and resources

Board composition: 15 members serving 3-year terms, representing universities, energy sector, healthcare, manufacturing, policy, and civic organizations. All meetings are open to the public with published minutes.`,
    ctaText: 'View Draft Charter',
    ctaLink: '/docs/advisory-board-charter'
  },
  {
    id: 'workforce',
    icon: GraduationCap,
    title: 'Workforce Development & Shared Access',
    badge: {
      text: 'Live',
      variant: 'live'
    },
    summary: 'K-12 through community college pathways, paid fellowships, and open lab time for quantum computing and cryptography training.',
    details: `Building Pennsylvania's quantum workforce through accessible education and hands-on experience:

Education Pathways:
• K-12: Quantum literacy modules, coding clubs, science fair support
• Community Colleges: 2-year quantum technician certification programs
• Universities: Research fellowships, industry internships, PhD partnerships
• Mid-career: Reskilling programs for engineers and scientists

Shared Lab Access:
• Free compute time on quantum simulators and actual quantum hardware
• Open-source curriculum and teaching resources
• Career-ready repositories students can showcase to employers
• Mentorship matching with industry professionals

Current Pilot: Lancaster Community College quantum tech certificate program (Fall 2025), partnering with Penn State and local energy companies.`,
    ctaText: 'Explore Training Programs',
    ctaLink: '/programs/workforce'
  },
  {
    id: 'sovereignty',
    icon: Shield,
    title: 'Technological Sovereignty & Security',
    badge: {
      text: 'Live',
      variant: 'live'
    },
    summary: 'Post-Quantum Cryptography migration toolkit, quantum-safe infrastructure assessment, and incident response drills.',
    details: `Protecting Pennsylvania's critical infrastructure from quantum threats:

PQC Migration Support:
• Free crypto inventory scanning tools for state agencies and utilities
• NIST-compliant algorithm implementation guides
• Hybrid classical-quantum transition strategies
• Regular security audits and penetration testing

Infrastructure Hardening:
• Quantum Key Distribution (QKD) pilot for grid operators
• Quantum-resistant authentication for government systems
• Secure communication channels for emergency services
• Supply chain verification and hardware security

Training & Drills:
• Incident response simulations for quantum attacks
• Tabletop exercises with energy sector partners
• Red team/blue team quantum security competitions
• Information sharing with federal CISA partners

Active Projects: PQC Pathfinder (crypto migration toolkit), GridSense (quantum-safe SCADA), statewide quantum security assessment.`,
    ctaText: 'Learn About PQC Migration',
    ctaLink: '/programs/pqc-migration'
  },
  {
    id: 'ethics',
    icon: Scale,
    title: 'Quantum Ethics & Governance Commission',
    badge: {
      text: 'Draft Model',
      variant: 'draft'
    },
    summary: 'Independent commission to review AI/quantum applications for bias, privacy risks, and societal impact before deployment.',
    details: `Ensuring quantum technologies serve the public interest:

Commission Structure:
• 12 members: ethicists, legal scholars, technologists, community advocates
• Independent authority to review state-funded quantum projects
• Public comment periods for major technology deployments
• Annual ethics impact assessments published openly

Review Criteria:
• Algorithmic fairness and bias detection
• Privacy protection and data sovereignty
• Environmental impact and energy use
• Equitable access and digital divide considerations
• Workforce displacement and retraining needs

Enforcement Powers:
• Require ethics impact statements before project approval
• Mandate third-party audits for high-risk applications
• Issue public recommendations to legislature
• Coordinate with other state ethics bodies

Pilot Projects: Review process for quantum optimization in healthcare resource allocation, AI-enhanced predictive policing systems, and automated benefits eligibility determination.`,
    ctaText: 'Read Draft Framework',
    ctaLink: '/programs/ethics-commission'
  }
];
