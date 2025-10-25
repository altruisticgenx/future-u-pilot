import { supabase } from "@/integrations/supabase/client";

export interface SectorMetric {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  change?: string;
}

export interface SectorData {
  sector: string;
  lastUpdated: string;
  status: "active" | "pilot" | "planning";
  metrics: SectorMetric[];
  liveData: {
    currentProjects: number;
    activeParticipants: number;
    completionRate: number;
  };
}

export interface ROIData {
  sector: string;
  roi: number;
  payback: string;
  colorClass: string;
  glowClass: string;
  icon: string;
}

// Mock data generator for demo purposes
const generateMockSectorData = (sector: string): SectorData => {
  const now = new Date().toISOString();
  
  const mockData: Record<string, SectorData> = {
    students: {
      sector: "Students",
      lastUpdated: now,
      status: "active",
      metrics: [
        { label: "Active Programs", value: 47, trend: "up", change: "+12%" },
        { label: "Student Enrollment", value: "2,834", trend: "up", change: "+23%" },
        { label: "Job Placements", value: "89%", trend: "up", change: "+5%" },
        { label: "Avg. Salary Increase", value: "$18.5K", trend: "up", change: "+8%" },
      ],
      liveData: {
        currentProjects: 47,
        activeParticipants: 2834,
        completionRate: 89,
      },
    },
    energy: {
      sector: "Energy",
      lastUpdated: now,
      status: "active",
      metrics: [
        { label: "Grid Optimization", value: "22%", trend: "up", change: "+3%" },
        { label: "Energy Savings", value: "$2.4M", trend: "up", change: "+15%" },
        { label: "Carbon Reduction", value: "1,240 tons", trend: "up", change: "+18%" },
        { label: "Active Pilots", value: 12, trend: "stable" },
      ],
      liveData: {
        currentProjects: 12,
        activeParticipants: 156,
        completionRate: 94,
      },
    },
    healthcare: {
      sector: "Healthcare",
      lastUpdated: now,
      status: "pilot",
      metrics: [
        { label: "Drug Discovery Time", value: "-38%", trend: "up", change: "improvement" },
        { label: "Diagnostic Accuracy", value: "94.7%", trend: "up", change: "+6%" },
        { label: "Research Partnerships", value: 23, trend: "up", change: "+8" },
        { label: "Clinical Trials", value: 9, trend: "up", change: "+3" },
      ],
      liveData: {
        currentProjects: 23,
        activeParticipants: 456,
        completionRate: 78,
      },
    },
    governance: {
      sector: "Governance",
      lastUpdated: now,
      status: "active",
      metrics: [
        { label: "Policy Initiatives", value: 18, trend: "up", change: "+6" },
        { label: "Public Engagement", value: "12.3K", trend: "up", change: "+34%" },
        { label: "Economic Impact", value: "$45M", trend: "up", change: "+22%" },
        { label: "Advisory Board Meetings", value: 24, trend: "stable" },
      ],
      liveData: {
        currentProjects: 18,
        activeParticipants: 12300,
        completionRate: 91,
      },
    },
  };

  return mockData[sector] || mockData.students;
};

const generateMockROIData = (): ROIData[] => {
  return [
    { sector: "Education", roi: 4.3, payback: "18 months", colorClass: "from-cyan-400 to-cyan-600", glowClass: "shadow-cyan-500/50", icon: "GraduationCap" },
    { sector: "Energy", roi: 3.8, payback: "15 months", colorClass: "from-emerald-400 to-emerald-600", glowClass: "shadow-emerald-500/50", icon: "Zap" },
    { sector: "Healthcare", roi: 3.2, payback: "19 months", colorClass: "from-fuchsia-400 to-fuchsia-600", glowClass: "shadow-fuchsia-500/50", icon: "Heart" },
    { sector: "Governance", roi: 5.1, payback: "12 months", colorClass: "from-amber-400 to-amber-600", glowClass: "shadow-amber-500/50", icon: "Scale" },
  ];
};

// Fetch sector data with caching
export const fetchSectorData = async (sector: string): Promise<SectorData> => {
  const cacheKey = `sector_${sector}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 30000) { // 30 second cache
      return data;
    }
  }

  // Try to fetch from Supabase edge function (if exists)
  try {
    const { data, error } = await supabase.functions.invoke('quantum-metrics', {
      body: { sector },
    });

    if (error) throw error;
    
    sessionStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
    
    return data;
  } catch (error) {
    console.log('Using mock data for sector:', sector);
    const mockData = generateMockSectorData(sector);
    sessionStorage.setItem(cacheKey, JSON.stringify({
      data: mockData,
      timestamp: Date.now(),
    }));
    return mockData;
  }
};

// Fetch ROI data
export const fetchROIData = async (): Promise<ROIData[]> => {
  const cacheKey = 'roi_data';
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 30000) {
      return data;
    }
  }

  try {
    const { data, error } = await supabase.functions.invoke('quantum-roi');

    if (error) throw error;
    
    sessionStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
    
    return data;
  } catch (error) {
    console.log('Using mock ROI data');
    const mockData = generateMockROIData();
    sessionStorage.setItem(cacheKey, JSON.stringify({
      data: mockData,
      timestamp: Date.now(),
    }));
    return mockData;
  }
};

// Simulate live updates
export const subscribeSectorUpdates = (
  sector: string,
  callback: (data: SectorData) => void
) => {
  const interval = setInterval(async () => {
    const data = await fetchSectorData(sector);
    callback(data);
  }, 30000); // Update every 30 seconds

  return () => clearInterval(interval);
};
