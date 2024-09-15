import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  const {
    isLoading,
    data: cabinData,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabinData, error };
}
