import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}

// export function useCabins() {
//     const {
//       isLoading,
//       data: cabins,
//       error,
//     } = useQuery({
//       queryKey: ["cabins"],
//       queryFn: getCabins,
//     });

//     return { isLoading, cabins, error };
//   }
