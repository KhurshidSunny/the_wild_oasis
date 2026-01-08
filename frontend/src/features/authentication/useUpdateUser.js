/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: (data) => {
      // Handle different response structures
      const user = data?.user || data?.data?.user || data?.data || data;
      toast.success("User account successfully updated");
      // setting cache value manually
      if (user) {
        queryClient.setQueryData(["user"], user);
      }
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to update user account";
      toast.error(errorMessage);
    },
  });

  return { isUpdating, updateUser };
}
