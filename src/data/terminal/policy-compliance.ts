export const FEDERAL_POLICIES = [
  {
    id: 'EO-14110',
    name: 'Executive Order on Safe, Secure, and Trustworthy AI',
    date: '2023-10-30',
    agency: 'White House',
    status: 'Active',
    requirements: [
      'Risk assessment for large models',
      'Red-team testing before deployment',
      'Transparency reporting on capabilities',
      'Content authentication and watermarking',
      'Privacy-preserving techniques'
    ]
  },
  {
    id: 'NIST-AI-RMF',
    name: 'NIST AI Risk Management Framework',
    date: '2023-01-26',
    agency: 'NIST',
    status: 'Active',
    requirements: [
      'Govern: Accountability and oversight',
      'Map: Context and risks',
      'Measure: Test and validation',
      'Manage: Risk mitigation'
    ]
  },
  {
    id: 'OMB-M-24-10',
    name: 'Advancing Governance for AI in Government',
    date: '2024-03-28',
    agency: 'OMB',
    status: 'Active',
    requirements: [
      'AI inventory and impact assessment',
      'Safety testing for rights-impacting systems',
      'Human review for critical decisions',
      'Continuous monitoring and evaluation'
    ]
  },
  {
    id: 'EU-AI-ACT',
    name: 'European Union AI Act',
    date: '2024-05-21',
    agency: 'EU Commission',
    status: 'Enacted',
    requirements: [
      'Risk-based classification (minimal, limited, high, unacceptable)',
      'Conformity assessments for high-risk AI',
      'Transparency obligations',
      'Post-market monitoring'
    ]
  },
  {
    id: 'GDPR',
    name: 'General Data Protection Regulation',
    date: '2018-05-25',
    agency: 'EU',
    status: 'Active',
    requirements: [
      'Data minimization',
      'Purpose limitation',
      'Right to explanation for automated decisions',
      'Data protection impact assessments'
    ]
  }
];

export const COMPLIANCE_FRAMEWORKS = [
  { 
    name: 'FedRAMP', 
    level: 'High', 
    requirements: 325, 
    certifiable: true,
    description: 'Federal Risk and Authorization Management Program'
  },
  { 
    name: 'NIST AI RMF', 
    version: '1.0', 
    guidelines: 7, 
    categories: 4,
    description: 'AI Risk Management Framework'
  },
  { 
    name: 'NIST CSF', 
    version: '2.0', 
    functions: 6, 
    categories: 23,
    description: 'Cybersecurity Framework'
  },
  { 
    name: 'ISO 27001', 
    controls: 114, 
    certifiable: true,
    description: 'Information Security Management'
  },
  { 
    name: 'SOC 2 Type II', 
    trust_principles: 5, 
    certifiable: true,
    description: 'Service Organization Control'
  },
  { 
    name: 'HIPAA', 
    rules: 3, 
    certifiable: false,
    description: 'Health Insurance Portability and Accountability Act'
  }
];

export const COMPLIANCE_CHECKLIST = {
  data_protection: {
    encryption_at_rest: true,
    encryption_in_transit: true,
    data_classification: true,
    retention_policy: true,
    gdpr_compliance: false
  },
  ai_governance: {
    model_inventory: true,
    risk_assessment: true,
    bias_testing: false,
    explainability: false,
    human_oversight: true
  },
  security: {
    vulnerability_scanning: true,
    penetration_testing: false,
    access_control: true,
    audit_logging: true,
    incident_response: true
  },
  operational: {
    sop_documented: true,
    training_completed: false,
    monitoring_enabled: true,
    disaster_recovery: true,
    business_continuity: true
  }
};
