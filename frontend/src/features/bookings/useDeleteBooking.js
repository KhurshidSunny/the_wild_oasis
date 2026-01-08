import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: (data) => {
      // Check if this was a demo mode delete
      if (data?.demoMode) {
        toast.success(`The booking was successfully deleted (Demo Mode - data preserved)`);
      } else {
        toast.success(`The booking was successfully deleted`);
      }

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      console.error(err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to delete booking";
      toast.error(errorMessage);
    },
  });

  return { isDeleting, deleteBooking };
}
