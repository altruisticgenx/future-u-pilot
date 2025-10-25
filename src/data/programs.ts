import { Briefcase, GraduationCap, Shield, Scale } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Program {
  id: string;
  icon: LucideIcon;
  title: string;
  badge: string;
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
    badge: 'Draft Model',
    summary: 'Mixed board (life sciences, energy, manufacturing, academia, public) drafts annual plans and budgets; majorities approve. Transparent charters, published minutes, measurable targets.',
    details: `
      <h3 class="text-base font-semibold mb-3">Board Structure & Process</h3>
      <p class="mb-3">A key element of a successful state quantum initiative would be a Quantum Initiative Advisory Board that drafts annual or biannual plans based on initiative-defined goals. A majority in the legislature should approve the plans.</p>
      
      <h4 class="text-sm font-semibold mt-4 mb-2">Board Composition:</h4>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>Industry experts from life sciences, energy sector, and manufacturing</li>
        <li>Appointed members from both governor's office and legislature</li>
        <li>Academic and public representatives</li>
        <li>Transparent selection process with published criteria</li>
      </ul>

      <h4 class="text-sm font-semibold mt-4 mb-2">Example Goals for Pennsylvania:</h4>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>Level up K-12 and technical schools so students can access IT careers without a 4-year degree</li>
        <li>Create a successful quantum computing program for climate adaptation and the environment</li>
        <li>Upgrade Pennsylvania's networking with fiber optics and photonics</li>
        <li>Apply quantum computing to government functions like emergency vehicle placement, energy, and water network efficiency</li>
        <li>Develop novel materials for high-efficiency manufacturing with minimal environmental impact</li>
        <li>Prepare for quantum era with post-quantum encryption and quantum key distribution</li>
        <li>Build internationally competitive quantum medicine and life sciences industries</li>
      </ul>
    `,
    ctaText: 'View Board Charter Draft',
    ctaLink: 'https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing'
  },
  {
    id: 'workforce',
    icon: GraduationCap,
    title: 'Workforce & Shared Access',
    badge: 'Live',
    summary: 'K-12 through community college to research labs — with shared quantum access so students touch real systems, not just slides.',
    details: `
      <h3 class="text-base font-semibold mb-3">Building Pennsylvania's Quantum Workforce</h3>
      <p class="mb-3">For Pennsylvania to develop and deploy quantum technologies, we need to train a generation of scientists and technologists proficient in classical computing, quantum software, and quantum mechanics.</p>

      <h4 class="text-sm font-semibold mt-4 mb-2">Training Pipeline:</h4>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li><strong>K-12:</strong> Support all students with quantum fundamentals and computing basics—we don't know who will discover the next algorithm</li>
        <li><strong>Community Colleges:</strong> Build skills in computer science and advanced computer manufacturing</li>
        <li><strong>Universities:</strong> Create pipelines to advanced computing industry, making quantum physics accessible for programmers</li>
        <li><strong>Research Institutions:</strong> Focus on useful quantum technologies with innovation funds and zones</li>
      </ul>

      <h4 class="text-sm font-semibold mt-4 mb-2">Shared Access Infrastructure:</h4>
      <p class="text-sm mb-2">A shared access infrastructure program facilitates using quantum computers—proven successful with early classical computers. This ensures students touch real quantum systems, not just theory.</p>
      
      <p class="text-sm italic text-muted-foreground mt-4">Our autonomy and ability to support American values are downstream from strength in our economy and our capacity in advanced science.</p>
    `,
    ctaText: 'Schools & Districts Toolkit',
    ctaLink: 'https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing'
  },
  {
    id: 'sovereignty',
    icon: Shield,
    title: 'Technological Sovereignty',
    badge: 'Critical',
    summary: 'PQC rollout, photonic networking, and local-first infrastructure so Pennsylvania isn't renting its future.',
    details: `
      <h3 class="text-base font-semibold mb-3">Pennsylvania's Tech Independence</h3>
      <p class="mb-3">In recent years, sovereignty in technological development has become a more appreciated aspect of governance. Quantum computing is rapidly scaling to the millions of qubits stage necessary for complex applications within the next 5 years.</p>

      <h4 class="text-sm font-semibold mt-4 mb-2">Post-Quantum Encryption (PQE):</h4>
      <p class="text-sm mb-2">PQE will be necessary across all digital systems to ensure security before and during the quantum computing era. A strategy called "harvest now, decrypt later" is already being used today in anticipation of decryption strategies, some of which will use quantum computers in coming years.</p>

      <h4 class="text-sm font-semibold mt-4 mb-2">Photonic Networking:</h4>
      <p class="text-sm mb-2">Photonic networking has transmission speed near the speed of light and virtually limitless bandwidth. If fiber became the new base networking in the state, we would be more competitive in infrastructure with fellow states and rival nations.</p>

      <h4 class="text-sm font-semibold mt-4 mb-2">Quantum Key Distribution (QKD):</h4>
      <p class="text-sm mb-2">QKD may become a key networking tool if its development reaches a stage where it can be deployed securely.</p>

      <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
        <p class="text-sm"><strong>Regional Competition:</strong> Maryland and New York are advancing quickly with their quantum agendas. We must invest to remain competitive regionally and domestically.</p>
      </div>
    `,
    ctaText: 'Security Readiness Guide',
    ctaLink: 'https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing'
  },
  {
    id: 'ethics',
    icon: Scale,
    title: 'Ethics & Governance Commission',
    badge: 'Independent',
    summary: 'A separate, independent body to review societal impacts, privacy, explainability, local consent, and labor/economic rights — before deployment.',
    details: `
      <h3 class="text-base font-semibold mb-3">Rights in the Quantum Era</h3>
      <p class="mb-3">Technology is only as good as humanity's rights within it. We need to establish how we will use quantum technologies as a state before and while this technology is being developed, because we value the individual's rights as the state where the constitution was written.</p>

      <h4 class="text-sm font-semibold mt-4 mb-2">Commission Mandate:</h4>
      <p class="text-sm mb-3">The Quantum Ethics and Governance Commission would continuously review new quantum technologies ethical, legal, and social implications before deployment in government or state-regulated sectors. This commission must be separate from the Quantum Initiative Advisory Board.</p>

      <h4 class="text-sm font-semibold mt-4 mb-2">Protected Rights:</h4>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li><strong>Data Privacy:</strong> Clear guidelines when deploying algorithms and quantum technology in government and private sector</li>
        <li><strong>Explainability:</strong> Right to understand how our data is used</li>
        <li><strong>Local Autonomy:</strong> Localities need developmental autonomy over industrial buildout with public input</li>
        <li><strong>Economic Rights:</strong> Fair wages and long-term employment in quantum-related industries</li>
        <li><strong>Scientific Freedom:</strong> Clear rules for IP licensing and pathways to continue developing technologies within Pennsylvania</li>
        <li><strong>Freedom of Thought:</strong> Protection of cognitive liberty as technology reaches our brains</li>
      </ul>

      <div class="bg-primary/10 border border-primary/30 rounded-lg p-3 mt-4">
        <p class="text-sm italic">The best way to protect individual rights is to establish this commission in a quantum initiative with clear parameters separate from technical development.</p>
      </div>
    `,
    ctaText: 'Read the Ethics Framework',
    ctaLink: 'https://docs.google.com/document/d/1NlzqlnBLt_iWwqLGH3SUTUlASFIZBEaimJYq6MFXB8I/edit?usp=sharing'
  }
];
