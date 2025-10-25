import { SectorData } from '@/types/quantum';

// Mock API endpoints - replace with real endpoints when available
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple cache
const cache = new Map<string, { data: any; timestamp: number }>();

const fetchWithCache = async <T>(endpoint: string): Promise<T> => {
  const cached = cache.get(endpoint);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    cache.set(endpoint, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    // Return mock data on error
    return getMockData(endpoint) as T;
  }
};

// Mock data for development/fallback
const getMockData = (endpoint: string): SectorData | SectorData[] => {
  const mockData: Record<string, SectorData> = {
    students: {
      sector: 'students',
      mission: 'Build Your Quantum Career Core',
      roi: {
        paybackMonths: 18,
        multiplier: 4.3,
        investmentAmount: 50000,
        returnAmount: 215000,
      },
      marketData: {
        talentGap: 420,
        nationalGap: 6000,
        averageSalary: 95000,
        jobGrowthRate: 38.5,
        lastUpdated: new Date().toISOString(),
      },
      programs: [
        { name: 'Qiskit Bootcamp', participants: 145, status: 'active' },
        { name: 'Quantum Hackathon', participants: 89, status: 'upcoming' },
        { name: 'Penn State Labs', participants: 62, status: 'active' },
      ],
      apis: [
        { name: 'Qiskit API', url: 'https://qiskit.org/api', status: 'online' },
        { name: 'Penn State Quantum Lab', url: '#', status: 'online' },
        { name: 'Quantum Open Science', url: '#', status: 'online' },
      ],
      highlights: 'Career pathways, quantum programming curricula (Qiskit, Cirq), talent retention',
      learnMore: 'Join coding bootcamps, contribute to open-source quantum projects, participate in hackathons',
    },
    energy: {
      sector: 'energy',
      mission: 'Power Grid. Smarter. Safer.',
      roi: {
        paybackMonths: 15,
        multiplier: 3.8,
        energySavings: 22,
        costReduction: 18.5,
      },
      marketData: {
        gridEfficiency: 87.3,
        outagesPrevented: 12,
        emissionsReduced: 3400,
        marketSize: '80B',
        cagr: 4.0,
        lastUpdated: new Date().toISOString(),
      },
      pilots: [
        { name: 'Microgrid Optimization', status: 'active', progress: 67 },
        { name: 'QKD Infrastructure', status: 'planning', progress: 23 },
        { name: 'SCADA Integration', status: 'active', progress: 45 },
      ],
      apis: [
        { name: 'OpenEI Data Portal', url: 'https://openei.org', status: 'online' },
        { name: 'PJM Load API', url: '#', status: 'online' },
        { name: 'NREL Solar/Wind', url: '#', status: 'online' },
      ],
      highlights: 'Quantum simulation of grids, quantum-secure infrastructure, reduced emissions',
      learnMore: 'Integrate quantum simulation with SCADA, run pilot projects, implement QKD',
    },
    healthcare: {
      sector: 'healthcare',
      mission: 'Diagnostics & Discovery. Accelerated.',
      roi: {
        paybackMonths: 19,
        multiplier: 3.2,
        investmentAmount: 75000,
        returnAmount: 240000,
      },
      marketData: {
        rdCostReduction: 30,
        drugDiscoverySpeed: 45,
        proteinSimulations: 1250,
        clinicalTrials: 8,
        lastUpdated: new Date().toISOString(),
      },
      programs: [
        { name: 'Protein Folding Research', status: 'active', progress: 78 },
        { name: 'Drug Discovery Pipeline', status: 'active', progress: 56 },
        { name: 'Quantum Imaging', status: 'planning', progress: 15 },
      ],
      apis: [
        { name: 'Protein Data Bank', url: 'https://www.rcsb.org', status: 'online' },
        { name: 'QChem Simulation', url: '#', status: 'online' },
        { name: 'OpenFDA', url: 'https://open.fda.gov', status: 'online' },
      ],
      highlights: 'Molecular simulation, quantum imaging, personalized treatments',
      learnMore: 'Integrate quantum simulation pipelines, partner with biotech startups, train on quantum chemistry',
    },
    governance: {
      sector: 'governance',
      mission: 'Policy Frameworks. Future-Ready.',
      roi: {
        paybackMonths: 12,
        multiplier: 5.1,
        investmentAmount: 40000,
        returnAmount: 204000,
      },
      marketData: {
        policyFrameworks: 80,
        stateReadinessRank: 8,
        advisoryMembers: 45,
        legislativeActions: 12,
        lastUpdated: new Date().toISOString(),
      },
      programs: [
        { name: 'Advisory Board', status: 'active', progress: 100 },
        { name: 'Ethics Commission', status: 'active', progress: 82 },
        { name: 'Policy Dashboards', status: 'active', progress: 65 },
      ],
      apis: [
        { name: 'GovTrack API', url: 'https://www.govtrack.us/api', status: 'online' },
        { name: 'Open States API', url: 'https://openstates.org/api', status: 'online' },
        { name: 'PA Legislative Portal', url: '#', status: 'online' },
      ],
      highlights: 'Advisory Board, Ethics Commission, technology sovereignty',
      learnMore: 'Develop open-source policy templates, host civic hackathons, implement public dashboards',
    },
  };

  if (endpoint === '/sectors') {
    return Object.values(mockData);
  }

  const sectorName = endpoint.replace('/sectors/', '');
  return mockData[sectorName] || mockData.students;
};

export const quantumApi = {
  getSectorData: (sector: string) => fetchWithCache<SectorData>(`/sectors/${sector}`),
  getAllSectors: () => fetchWithCache<SectorData[]>('/sectors'),
};
