/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate()
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    

    onSuccess: (user) => {
      if(user.token) {
        navigate('/dashboard')
      }
      toast.success(
        `Account successfully created! `
      );
    },
    onError: (err) => {
      // navigate('/users')
      console.log(err)
      toast.error(`Error: ${err.response.data.message}`)
    }
  });

  return { isLoading, signup };
}
