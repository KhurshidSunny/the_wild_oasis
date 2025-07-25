/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });


  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
