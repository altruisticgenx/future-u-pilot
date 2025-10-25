export const RESEARCH_PAPERS = [
  {
    title: 'Attention Is All You Need',
    authors: ['Vaswani et al.'],
    venue: 'NeurIPS 2017',
    year: 2017,
    citations: 95000,
    topic: 'Transformers',
    url: 'https://arxiv.org/abs/1706.03762',
    impact: 'Revolutionary - introduced transformer architecture'
  },
  {
    title: 'Quantum Supremacy Using a Programmable Superconducting Processor',
    authors: ['Arute et al.'],
    venue: 'Nature',
    year: 2019,
    citations: 5200,
    topic: 'Quantum Computing',
    url: 'https://www.nature.com/articles/s41586-019-1666-5',
    impact: 'First demonstration of quantum supremacy'
  },
  {
    title: 'Language Models are Few-Shot Learners (GPT-3)',
    authors: ['Brown et al.'],
    venue: 'NeurIPS 2020',
    year: 2020,
    citations: 22000,
    topic: 'Large Language Models',
    url: 'https://arxiv.org/abs/2005.14165',
    impact: 'Demonstrated emergent few-shot learning'
  },
  {
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    authors: ['He et al.'],
    venue: 'CVPR 2016',
    year: 2016,
    citations: 165000,
    topic: 'Computer Vision',
    url: 'https://arxiv.org/abs/1512.03385',
    impact: 'Enabled training of very deep neural networks'
  },
  {
    title: "Shor's Algorithm for Factoring Large Numbers",
    authors: ['Shor, P.'],
    venue: 'IEEE FOCS 1994',
    year: 1994,
    citations: 11000,
    topic: 'Quantum Algorithms',
    url: 'https://ieeexplore.ieee.org/document/365700',
    impact: 'Proved quantum advantage for factoring'
  },
  {
    title: 'Constitutional AI: Harmlessness from AI Feedback',
    authors: ['Bai et al.'],
    venue: 'ArXiv 2022',
    year: 2022,
    citations: 1800,
    topic: 'AI Safety',
    url: 'https://arxiv.org/abs/2212.08073',
    impact: 'New approach to AI alignment and safety'
  },
  {
    title: 'CRYSTALS-Kyber: A CCA-Secure Module-Lattice-Based KEM',
    authors: ['Bos et al.'],
    venue: 'EuroS&P 2018',
    year: 2018,
    citations: 850,
    topic: 'Post-Quantum Cryptography',
    url: 'https://eprint.iacr.org/2017/634',
    impact: 'NIST PQC standard for key encapsulation'
  },
  {
    title: 'ImageNet Classification with Deep CNNs (AlexNet)',
    authors: ['Krizhevsky et al.'],
    venue: 'NeurIPS 2012',
    year: 2012,
    citations: 125000,
    topic: 'Deep Learning',
    url: 'https://papers.nips.cc/paper/4824',
    impact: 'Sparked the deep learning revolution'
  },
  {
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive Tasks',
    authors: ['Lewis et al.'],
    venue: 'NeurIPS 2020',
    year: 2020,
    citations: 3400,
    topic: 'RAG/LLMs',
    url: 'https://arxiv.org/abs/2005.11401',
    impact: 'Foundation for modern RAG systems'
  },
  {
    title: 'Quantum Error Correction for Beginners',
    authors: ['Devitt et al.'],
    venue: 'Rep. Prog. Phys. 2013',
    year: 2013,
    citations: 1100,
    topic: 'Quantum Computing',
    url: 'https://iopscience.iop.org/article/10.1088/0034-4885/76/7/076001',
    impact: 'Comprehensive review of QEC techniques'
  }
];

export const RESEARCH_TOPICS = [
  { topic: 'Quantum Computing', papers: 24, trending: true },
  { topic: 'Large Language Models', papers: 156, trending: true },
  { topic: 'Post-Quantum Cryptography', papers: 18, trending: true },
  { topic: 'AI Safety & Alignment', papers: 42, trending: true },
  { topic: 'Computer Vision', papers: 89, trending: false },
  { topic: 'Reinforcement Learning', papers: 67, trending: false },
  { topic: 'Quantum Algorithms', papers: 31, trending: true },
  { topic: 'Federated Learning', papers: 28, trending: false },
  { topic: 'Explainable AI', papers: 45, trending: true },
  { topic: 'Multimodal AI', papers: 52, trending: true }
];

export const CASE_STUDIES = [
  {
    title: 'Municipal AI Policy Compliance',
    client: 'City of Springfield',
    duration: '8 weeks',
    outcome: 'Full EO-14110 compliance + policy automation',
    challenge: 'Complex federal AI regulations',
    solution: 'Automated policy mapping + risk assessment',
    impact: '67% faster compliance reviews'
  },
  {
    title: 'University Quantum-Safe Migration',
    client: 'State University Research Lab',
    duration: '12 weeks',
    outcome: 'Hybrid PQC deployment across 200+ systems',
    challenge: 'Legacy cryptography in research infrastructure',
    solution: 'Phased migration with zero downtime',
    impact: 'Quantum-ready by 2025'
  },
  {
    title: 'Civic AI Governance Sandbox',
    client: 'County Government',
    duration: '6 weeks',
    outcome: 'PolicyBot prototype + 38% efficiency gain',
    challenge: 'Manual tracking of OSHA/EPA updates',
    solution: 'AI-powered policy change detection',
    impact: 'Real-time compliance monitoring'
  }
];
