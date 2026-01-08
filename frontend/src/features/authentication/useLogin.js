import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      toast.success("The user has been logged in successfully");
      
      // Clear any existing user cache first
      queryClient.removeQueries({ queryKey: ["user"] });
      
      // Set user data in cache - handle different response structures
      const user = data?.user || data?.data?.user || data;
      if (user) {
        // Set the new user data
        queryClient.setQueryData(["user"], user);
      }
      
      // Invalidate to ensure fresh data is fetched on next render
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error("Login error:", err);
      
      // Show specific error messages based on error type
      let errorMessage = "Failed to login";
      
      if (err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
        errorMessage = "Cannot connect to server. Please check if the backend is running.";
      } else if (err.response?.status === 401) {
        errorMessage = err.response?.data?.message || "Email or password is incorrect";
      } else if (err.response?.status === 404) {
        errorMessage = "Server endpoint not found. Please check backend configuration.";
      } else if (err.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    },
  });
  return { isLoading, login };
}
