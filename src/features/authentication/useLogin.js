import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: loging,
    isLoading: isLoging,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (user) => {
      toast.success("user successfully logeed in");
      // console.log(user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },

    onError: () => {
      toast.error("There was some problem loggin in");
    },
  });

  return { loging, isLoging, error };
}
