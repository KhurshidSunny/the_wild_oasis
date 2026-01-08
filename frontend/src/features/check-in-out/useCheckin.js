import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      // Get booking ID from response data - handle different response structures
      const bookingId = data?.id || data?.data?.id || data?.data?._id || "booking";
      toast.success(`Booking #${bookingId} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },

    onError: (err) => {
      toast.error(err?.message || "There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}

// export default useCheckin;
