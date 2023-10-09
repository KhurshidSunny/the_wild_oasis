/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,
    mutate: updateUser,
    error,
  } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      // setting cache value mannually
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
