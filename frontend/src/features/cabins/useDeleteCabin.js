import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: (data) => {
      // Check if this was a demo mode delete
      if (data?.demoMode) {
        toast.success("The cabin was successfully deleted (Demo Mode - data preserved)");
      } else {
        toast.success("The cabin was successfully deleted");
      }

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to delete cabin";
      toast.error(errorMessage);
    },
  });

  return { isDeleting, deleteCabin };
}
