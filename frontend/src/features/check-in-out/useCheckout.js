import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      // Get booking ID from response data - handle different response structures
      const bookingId = data?.id || data?.data?.id || data?.data?._id || "booking";
      toast.success(`Booking #${bookingId} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error(err?.message || "There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}

// export default useCheckout;
