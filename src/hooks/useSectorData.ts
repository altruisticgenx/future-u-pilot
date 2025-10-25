import { useQuery } from '@tanstack/react-query';
import { quantumApi } from '@/services/quantumApi';
import { SectorData } from '@/types/quantum';

export const useSectorData = (sector: string) => {
  return useQuery<SectorData>({
    queryKey: ['sector', sector],
    queryFn: () => quantumApi.getSectorData(sector),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for "live" feel
  });
};

export const useAllSectors = () => {
  return useQuery<SectorData[]>({
    queryKey: ['sectors'],
    queryFn: () => quantumApi.getAllSectors(),
    staleTime: 5 * 60 * 1000,
  });
};
