/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  // 1. FILTER
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" },

  //2. SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error, count };
}
