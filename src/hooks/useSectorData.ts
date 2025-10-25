import { useQuery } from "@tanstack/react-query";
import { fetchSectorData, fetchROIData, type SectorData, type ROIData } from "@/services/quantumApi";

export const useSectorData = (sector: string) => {
  return useQuery<SectorData>({
    queryKey: ["sector", sector],
    queryFn: () => fetchSectorData(sector),
    refetchInterval: 30000, // Refetch every 30 seconds for "live" feel
    staleTime: 25000,
  });
};

export const useROIData = () => {
  return useQuery<ROIData[]>({
    queryKey: ["roi"],
    queryFn: fetchROIData,
    refetchInterval: 30000,
    staleTime: 25000,
  });
};
