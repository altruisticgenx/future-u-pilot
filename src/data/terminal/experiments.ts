export const EXPERIMENTS = [
  {
    id: 'exp-001',
    name: 'Quantum-Classical Hybrid Optimization',
    status: 'active',
    started: '2024-11-15',
    progress: 68,
    team: 'Quantum Lab',
    description: 'Testing QAOA for portfolio optimization with 50 assets',
    metrics: {
      circuit_depth: 12,
      success_rate: 0.73,
      quantum_speedup: '2.3x',
      iterations: 1240
    }
  },
  {
    id: 'exp-002',
    name: 'LLM Fine-tuning for Policy Compliance',
    status: 'active',
    started: '2024-12-01',
    progress: 42,
    team: 'AI Policy Lab',
    description: 'Fine-tuning GPT-4 on federal AI regulations corpus',
    metrics: {
      training_loss: 0.234,
      validation_accuracy: 0.891,
      epochs: 8,
      dataset_size: '2.4M tokens'
    }
  },
  {
    id: 'exp-003',
    name: 'PQC Performance Benchmarking',
    status: 'completed',
    started: '2024-10-20',
    completed: '2024-11-30',
    progress: 100,
    team: 'Crypto Lab',
    description: 'Comprehensive benchmarks of CRYSTALS-Kyber vs RSA-2048',
    metrics: {
      keygen_speedup: '4.2x faster',
      encaps_speedup: '12.8x faster',
      decaps_speedup: '8.1x faster',
      key_size_increase: '4.6x larger'
    }
  },
  {
    id: 'exp-004',
    name: 'Explainable AI for Healthcare',
    status: 'active',
    started: '2024-11-01',
    progress: 55,
    team: 'XAI Lab',
    description: 'Developing SHAP-based explanations for medical diagnosis AI',
    metrics: {
      model_accuracy: 0.947,
      explanation_quality: 0.82,
      physician_trust: 0.78,
      fda_compliance: 'pending'
    }
  },
  {
    id: 'exp-005',
    name: 'Federated Learning for Privacy',
    status: 'paused',
    started: '2024-09-15',
    progress: 28,
    team: 'Privacy Lab',
    description: 'Decentralized model training across 50 healthcare institutions',
    metrics: {
      nodes_active: 42,
      communication_rounds: 120,
      privacy_budget: 'ε=1.5',
      model_accuracy: 0.863
    }
  },
  {
    id: 'exp-006',
    name: 'Quantum Error Correction Codes',
    status: 'active',
    started: '2024-10-01',
    progress: 73,
    team: 'Quantum Lab',
    description: 'Testing surface code performance on 127-qubit system',
    metrics: {
      logical_qubits: 7,
      code_distance: 5,
      error_suppression: '10^-4',
      gate_fidelity: 0.992
    }
  }
];

export const LAB_RESOURCES = {
  quantum_systems: 5,
  gpu_clusters: 12,
  total_compute: '4.2 PetaFLOPS',
  active_researchers: 47,
  publications_2024: 23,
  patents_filed: 8,
  funding: '$12.5M'
};

export const EXPERIMENT_TEMPLATES = [
  {
    name: 'Quantum Algorithm Benchmark',
    duration: '2-4 weeks',
    resources: 'Quantum system + classical simulator',
    outputs: ['Performance metrics', 'Scalability analysis', 'Paper draft']
  },
  {
    name: 'LLM Fine-tuning',
    duration: '1-3 weeks',
    resources: '4x A100 GPUs',
    outputs: ['Fine-tuned model', 'Evaluation report', 'Deployment guide']
  },
  {
    name: 'Cryptography Migration',
    duration: '4-8 weeks',
    resources: 'Test infrastructure + security tools',
    outputs: ['Migration plan', 'Performance comparison', 'Risk assessment']
  },
  {
    name: 'AI Policy Audit',
    duration: '1-2 weeks',
    resources: 'Compliance framework + assessment tools',
    outputs: ['Compliance report', 'Gap analysis', 'Remediation plan']
  }
];
