import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signingUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUp,

    onSuccess: () => {
      toast.success("Account sucessfull created ");
    },
    onError: (error) => {
      toast.error(error.message || "there was some problem signin Up");
    },
  });

  return { signingUp, isSigningUp };
}
