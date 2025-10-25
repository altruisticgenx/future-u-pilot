export interface MarketData {
  lastUpdated: string;
  [key: string]: string | number;
}

export interface Program {
  name: string;
  participants?: number;
  status: 'active' | 'upcoming' | 'planning' | 'completed';
  progress?: number;
}

export interface APIEndpoint {
  name: string;
  url: string;
  status: 'online' | 'offline' | 'maintenance';
}

export interface ROIData {
  paybackMonths: number;
  multiplier: number;
  investmentAmount?: number;
  returnAmount?: number;
  energySavings?: number;
  costReduction?: number;
}

export interface SectorData {
  sector: string;
  mission: string;
  roi: ROIData;
  marketData: MarketData;
  programs?: Program[];
  pilots?: Program[];
  apis: APIEndpoint[];
  highlights: string;
  learnMore: string;
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  change?: string;
}
