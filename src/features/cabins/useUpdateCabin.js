import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ updatedCabinData, id }) =>
      createAndEditCabin(updatedCabinData, id),
    onSuccess: () => {
      toast.success("cabin was successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCabin, isUpdating };
}
