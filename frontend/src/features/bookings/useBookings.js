/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1. FILTER
  const status = searchParams.get("status");
  const filter = status && status !== "all" ? { status } : {};

  // 2. SORT
  const sortBy = searchParams.get("sortBy") || "startDate";

  // 3. PAGINATION
  let page = Number(searchParams.get("page")) || 1;

  // QUERY
  const {
    isLoading,
    data: { data: bookings, total } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

    

  // console.log("from useBookings", bookings)

  // PRE-FETCHING
  const pageCount = Math.ceil(total / PAGE_SIZE);

  if (page > pageCount) page = pageCount;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });


  return { isLoading, bookings, error, total };
}
