export const PQC_ALGORITHMS = [
  {
    name: 'CRYSTALS-Kyber',
    type: 'Key Encapsulation',
    nist_level: 'Level 1, 3, 5',
    status: 'NIST Selected 2022',
    security_basis: 'Lattice-based (Module-LWE)',
    key_size: '800-1568 bytes',
    performance: 'Fast'
  },
  {
    name: 'CRYSTALS-Dilithium',
    type: 'Digital Signature',
    nist_level: 'Level 2, 3, 5',
    status: 'NIST Selected 2022',
    security_basis: 'Lattice-based (Module-LWE)',
    key_size: '1312-2592 bytes',
    performance: 'Fast'
  },
  {
    name: 'FALCON',
    type: 'Digital Signature',
    nist_level: 'Level 1, 5',
    status: 'NIST Selected 2022',
    security_basis: 'Lattice-based (NTRU)',
    key_size: '897-1793 bytes',
    performance: 'Very Fast'
  },
  {
    name: 'SPHINCS+',
    type: 'Digital Signature',
    nist_level: 'Level 1, 3, 5',
    status: 'NIST Selected 2022',
    security_basis: 'Hash-based',
    key_size: '32-64 bytes',
    performance: 'Slow signing'
  }
];

export const CRYPTO_INVENTORY = [
  { algorithm: 'RSA-2048', type: 'Asymmetric', status: 'Vulnerable to quantum', action: 'Migrate to PQC', priority: 'High' },
  { algorithm: 'RSA-4096', type: 'Asymmetric', status: 'Vulnerable to quantum', action: 'Migrate to PQC', priority: 'High' },
  { algorithm: 'ECDSA P-256', type: 'Asymmetric', status: 'Vulnerable to quantum', action: 'Migrate to PQC', priority: 'High' },
  { algorithm: 'ECDH P-384', type: 'Key Exchange', status: 'Vulnerable to quantum', action: 'Migrate to PQC', priority: 'High' },
  { algorithm: 'AES-256', type: 'Symmetric', status: 'Quantum-resistant', action: 'No action required', priority: 'Low' },
  { algorithm: 'SHA-256', type: 'Hash', status: 'Quantum-resistant', action: 'Consider SHA-384/512', priority: 'Medium' },
  { algorithm: 'SHA-512', type: 'Hash', status: 'Quantum-resistant', action: 'No action required', priority: 'Low' },
  { algorithm: 'ChaCha20-Poly1305', type: 'AEAD', status: 'Quantum-resistant', action: 'No action required', priority: 'Low' }
];

export const SECURITY_SCAN_RESULTS = {
  critical: 2,
  high: 5,
  medium: 12,
  low: 8,
  info: 15,
  total: 42,
  vulnerabilities: [
    { id: 'CVE-2024-1234', severity: 'Critical', component: 'OpenSSL 1.1.1', description: 'Buffer overflow in TLS', cvss: 9.8 },
    { id: 'CVE-2024-5678', severity: 'Critical', component: 'libcurl', description: 'Remote code execution', cvss: 9.1 },
    { id: 'CVE-2024-9012', severity: 'High', component: 'Node.js', description: 'Prototype pollution', cvss: 7.5 },
    { id: 'CVE-2024-3456', severity: 'High', component: 'Python', description: 'Path traversal', cvss: 7.2 },
    { id: 'CWE-787', severity: 'Medium', component: 'Custom code', description: 'Out-of-bounds write', cvss: 5.5 }
  ]
};

export const DEPRECATED_ALGORITHMS = [
  { name: 'MD5', deprecated: '2008', reason: 'Collision attacks', replacement: 'SHA-256' },
  { name: 'SHA-1', deprecated: '2017', reason: 'Collision attacks', replacement: 'SHA-256' },
  { name: 'DES', deprecated: '1999', reason: 'Key size too small', replacement: 'AES' },
  { name: '3DES', deprecated: '2023', reason: 'Legacy, vulnerable', replacement: 'AES' },
  { name: 'RC4', deprecated: '2015', reason: 'Biased output', replacement: 'ChaCha20' },
  { name: 'RSA-1024', deprecated: '2010', reason: 'Key size too small', replacement: 'RSA-2048 or PQC' }
];

export const PQC_MIGRATION_CHECKLIST = [
  { step: 'Inventory current cryptography', status: 'completed', priority: 1 },
  { step: 'Assess quantum threat timeline', status: 'completed', priority: 1 },
  { step: 'Select PQC algorithms (NIST)', status: 'in_progress', priority: 2 },
  { step: 'Test hybrid classical+PQC', status: 'in_progress', priority: 2 },
  { step: 'Update certificate infrastructure', status: 'not_started', priority: 3 },
  { step: 'Deploy PQC in production', status: 'not_started', priority: 4 },
  { step: 'Monitor and validate', status: 'not_started', priority: 5 },
  { step: 'Decommission classical crypto', status: 'not_started', priority: 6 }
];
