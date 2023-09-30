/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings as getBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";

export function useBookings() {
  const queryClient = useQueryClient();

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

  // 1. USEQUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  // PRE-FETCHING

  // i. for next button prefetching
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page + 1 }),
    });

  // ii. for previous button prefetching
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
