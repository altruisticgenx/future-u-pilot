export const QUANTUM_SYSTEMS = [
  {
    name: 'IBM Quantum Eagle',
    qubits: 127,
    topology: 'heavy-hex',
    coherence_time: '100μs',
    gate_error: '0.001',
    status: 'online',
    location: 'Yorktown Heights, NY'
  },
  {
    name: 'Google Sycamore',
    qubits: 54,
    topology: 'grid',
    coherence_time: '20μs',
    gate_error: '0.0016',
    status: 'online',
    location: 'Santa Barbara, CA'
  },
  {
    name: 'IonQ Forte',
    qubits: 32,
    topology: 'all-to-all',
    coherence_time: '10000μs',
    gate_error: '0.0002',
    status: 'online',
    location: 'College Park, MD'
  },
  {
    name: 'Rigetti Aspen-M3',
    qubits: 80,
    topology: 'octagonal',
    coherence_time: '45μs',
    gate_error: '0.0012',
    status: 'maintenance',
    location: 'Berkeley, CA'
  },
  {
    name: 'AWS Braket SV1',
    qubits: 34,
    topology: 'simulator',
    coherence_time: 'N/A',
    gate_error: '0.0000',
    status: 'online',
    location: 'Cloud (us-east-1)'
  }
];

export const QUANTUM_ALGORITHMS = [
  { name: "Shor's Algorithm", complexity: 'O((log N)³)', use_case: 'Integer Factorization', discovered: 1994 },
  { name: "Grover's Search", complexity: 'O(√N)', use_case: 'Database Search', discovered: 1996 },
  { name: 'VQE (Variational Quantum Eigensolver)', complexity: 'O(N²)', use_case: 'Molecular Simulation', discovered: 2014 },
  { name: 'QAOA (Quantum Approximate Optimization)', complexity: 'O(N²)', use_case: 'Combinatorial Optimization', discovered: 2014 },
  { name: 'Quantum Fourier Transform', complexity: 'O((log N)²)', use_case: 'Period Finding', discovered: 1994 },
  { name: 'Quantum Phase Estimation', complexity: 'O(N log N)', use_case: 'Eigenvalue Estimation', discovered: 1996 },
  { name: 'HHL Algorithm', complexity: 'O(log N)', use_case: 'Linear Systems', discovered: 2009 },
  { name: 'Quantum Annealing', complexity: 'O(exp(N))', use_case: 'Optimization', discovered: 1998 },
  { name: 'Quantum Walk', complexity: 'O(√N)', use_case: 'Graph Search', discovered: 2001 },
  { name: 'Bernstein-Vazirani', complexity: 'O(1)', use_case: 'Hidden String', discovered: 1993 }
];

export const QC_BENCHMARKS = {
  quantum_volume: 512,
  circuit_depth: 100,
  two_qubit_gate_fidelity: 0.99,
  readout_fidelity: 0.97,
  t1_time: '100μs',
  t2_time: '80μs',
  gate_time: '200ns'
};

export const QUANTUM_CIRCUIT_EXAMPLES = {
  bell_state: `
    ┌───┐     
q_0: ┤ H ├──■──
    └───┘┌─┴─┐
q_1: ─────┤ X ├
          └───┘
  `,
  grover_2q: `
    ┌───┐┌───┐┌───┐
q_0: ┤ H ├┤ X ├┤ H ├
    ├───┤├───┤├───┤
q_1: ┤ H ├┤ X ├┤ H ├
    └───┘└───┘└───┘
  `,
  qft_3q: `
    ┌───┐┌─────┐┌─────┐     
q_0: ┤ H ├┤ P(π/2) ├┤ P(π/4) ├─────
    ├───┤└──┬──┘└──┬──┘┌─────┐
q_1: ┤ H ├───■──────┼───┤ P(π/2) ├
    ├───┤          │   └──┬──┘
q_2: ┤ H ├──────────■──────■─────
    └───┘                      
  `
};
