/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" },

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookingsApi({ filter }),
  });

  return { isLoading, bookings, error };
}