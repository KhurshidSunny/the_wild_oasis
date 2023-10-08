/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    isLoading,
    mutate: signup,
    error,
  } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      toast.success(
        `Account successfully created! please verify the new account from the user's email address`
      );
    },
  });

  return { isLoading, signup };
}
