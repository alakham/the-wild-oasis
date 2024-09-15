import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updatingUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    // mutationKey: ["user"],

    onSuccess: (data) => {
      console.log(data);
      if (data && data.user)
        toast.success("User has been successfully updated");

      //   queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: () => {
      toast.error("There was some problems updating user");
    },
  });

  return { updatingUser, isUpdatingUser };
}
