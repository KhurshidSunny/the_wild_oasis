/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false, // Don't retry on error
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus
    cacheTime: 0, // Don't cache - always fetch fresh
  });

  return { isLoading, user, error, isAuthenticated: !!user };
}
