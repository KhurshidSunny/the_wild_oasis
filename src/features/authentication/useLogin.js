import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: () => {
      toast.success("the user has been logged in successfully");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(`Error`, err);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { isLoading, login };
}
