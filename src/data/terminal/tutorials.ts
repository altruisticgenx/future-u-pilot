export const TUTORIALS = {
  'quantum-101': {
    title: 'Quantum Computing Fundamentals',
    duration: '15 min',
    level: 'Beginner',
    steps: [
      {
        step: 1,
        title: 'What is a Qubit?',
        content: 'A qubit is the quantum analog of a classical bit. Unlike classical bits (0 or 1), qubits can exist in superposition - both 0 and 1 simultaneously.',
        example: '|ψ⟩ = α|0⟩ + β|1⟩  where |α|² + |β|² = 1'
      },
      {
        step: 2,
        title: 'Quantum Gates',
        content: 'Quantum gates manipulate qubits. Common gates: H (Hadamard), X (NOT), CNOT (Controlled-NOT), Z (Phase flip).',
        example: 'H|0⟩ = (|0⟩ + |1⟩)/√2  (creates superposition)'
      },
      {
        step: 3,
        title: 'Quantum Entanglement',
        content: 'When qubits become entangled, measuring one instantly affects the other, regardless of distance.',
        example: 'Bell State: |Φ+⟩ = (|00⟩ + |11⟩)/√2'
      },
      {
        step: 4,
        title: 'Quantum Algorithms',
        content: "Quantum algorithms like Shor's and Grover's provide exponential speedups for specific problems.",
        example: "Shor's: Factor N in O((log N)³) vs classical O(exp(log N)^(1/3))"
      }
    ]
  },
  'ai-basics': {
    title: 'AI/ML Fundamentals',
    duration: '20 min',
    level: 'Beginner',
    steps: [
      {
        step: 1,
        title: 'Machine Learning Types',
        content: 'Three main types: Supervised (labeled data), Unsupervised (unlabeled), Reinforcement (reward-based).',
        example: 'Supervised: Image classification\nUnsupervised: Clustering\nRL: Game playing'
      },
      {
        step: 2,
        title: 'Neural Networks',
        content: 'Artificial neural networks are inspired by biological brains. They learn patterns through layers of interconnected nodes.',
        example: 'Input → Hidden Layers → Output\nEach connection has a weight adjusted during training'
      },
      {
        step: 3,
        title: 'Training Process',
        content: 'Models learn by adjusting weights to minimize loss function using gradient descent.',
        example: 'Loss = Σ(predicted - actual)²\nUpdate: weight -= learning_rate * gradient'
      },
      {
        step: 4,
        title: 'Large Language Models',
        content: 'LLMs like GPT use transformer architecture with billions of parameters to understand and generate text.',
        example: 'GPT-4: 1.76T parameters, 128K context window'
      }
    ]
  },
  'pqc-migration': {
    title: 'Post-Quantum Cryptography Migration',
    duration: '25 min',
    level: 'Advanced',
    steps: [
      {
        step: 1,
        title: 'Quantum Threat Assessment',
        content: 'Understand the threat: Large-scale quantum computers will break RSA, ECDSA, and ECDH.',
        example: 'Timeline: 10-20 years for practical quantum attacks\nAction: Start migration now (NIST recommendation)'
      },
      {
        step: 2,
        title: 'Inventory Cryptography',
        content: 'Audit all cryptographic implementations in your systems. Identify vulnerable algorithms.',
        example: 'Vulnerable: RSA-2048, ECDSA P-256\nSafe: AES-256, SHA-256'
      },
      {
        step: 3,
        title: 'Select PQC Algorithms',
        content: 'NIST has selected 4 PQC algorithms. Choose based on your use case.',
        example: 'Key Exchange: CRYSTALS-Kyber\nSignatures: CRYSTALS-Dilithium, FALCON, SPHINCS+'
      },
      {
        step: 4,
        title: 'Hybrid Deployment',
        content: 'Deploy classical + PQC together during transition period for backward compatibility.',
        example: 'TLS: X25519+Kyber768 (hybrid key exchange)\nSignatures: ECDSA+Dilithium'
      },
      {
        step: 5,
        title: 'Testing & Validation',
        content: 'Test PQC implementations thoroughly. Monitor performance impact.',
        example: 'Key sizes: Kyber768 = 1184 bytes (vs RSA-2048 = 256 bytes)\nPerformance: Kyber is faster than RSA'
      }
    ]
  },
  'ai-policy': {
    title: 'AI Policy Compliance',
    duration: '18 min',
    level: 'Intermediate',
    steps: [
      {
        step: 1,
        title: 'Executive Order 14110',
        content: 'Latest federal AI policy requires risk assessments, red-teaming, and transparency for large models.',
        example: 'Applies to: Models trained with 10^26 FLOPS or more\nDeadline: 90-270 days from Oct 30, 2023'
      },
      {
        step: 2,
        title: 'NIST AI Risk Management',
        content: 'Framework provides guidance for managing AI risks across lifecycle.',
        example: 'Four functions: Govern, Map, Measure, Manage\n7 characteristics of trustworthy AI'
      },
      {
        step: 3,
        title: 'Impact Assessment',
        content: 'Conduct impact assessments for AI systems that affect civil rights, safety, or privacy.',
        example: 'Questions: Purpose? Data sources? Bias testing? Human oversight?'
      },
      {
        step: 4,
        title: 'Continuous Monitoring',
        content: 'Implement ongoing monitoring for model drift, bias, and performance degradation.',
        example: 'Metrics: Accuracy, fairness, explainability, robustness\nFrequency: Monthly reviews minimum'
      }
    ]
  }
};

export const QUICK_START_GUIDE = {
  title: 'Terminal Quick Start',
  sections: [
    {
      category: 'Essential Commands',
      commands: [
        { cmd: 'help', desc: 'Show all available commands' },
        { cmd: 'trending', desc: 'View trending quantum-AI topics' },
        { cmd: 'status', desc: 'System health and project status' },
        { cmd: 'clear', desc: 'Clear terminal screen' }
      ]
    },
    {
      category: 'Quantum Computing',
      commands: [
        { cmd: 'qc-status', desc: 'Quantum system status' },
        { cmd: 'qc-simulate grover', desc: 'Simulate Grover\'s algorithm' },
        { cmd: 'qc-benchmark', desc: 'Run quantum benchmarks' }
      ]
    },
    {
      category: 'AI/ML',
      commands: [
        { cmd: 'ai-models', desc: 'List available AI models' },
        { cmd: 'ai-train gpt-4 pile', desc: 'Simulate model training' },
        { cmd: 'datasets vision', desc: 'Browse vision datasets' }
      ]
    },
    {
      category: 'Security & Compliance',
      commands: [
        { cmd: 'pqc-status', desc: 'Post-quantum crypto status' },
        { cmd: 'policy-check', desc: 'Check AI policy compliance' },
        { cmd: 'security-scan', desc: 'Run security scan' }
      ]
    },
    {
      category: 'Learning',
      commands: [
        { cmd: 'tutorial quantum-101', desc: 'Start quantum computing tutorial' },
        { cmd: 'research transformers', desc: 'Search research papers' },
        { cmd: 'quickstart', desc: 'Show this guide again' }
      ]
    }
  ]
};
