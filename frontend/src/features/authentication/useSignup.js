/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    
    onSuccess: (data) => {
      // Handle different response structures
      const user = data?.data?.user || data?.user || data;
      const token = data?.token || data?.data?.token;
      
      if (token) {
        // Set user in cache
        if (user) {
          queryClient.setQueryData(["user"], user);
        }
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        navigate('/dashboard');
      }
      toast.success("Account successfully created!");
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to create user account";
      toast.error(errorMessage);
    }
  });

  return { isLoading, signup };
}
