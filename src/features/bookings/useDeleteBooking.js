import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deletingBooking, isLoading: isDeletingBooking } = useMutation(
    {
      mutationFn: (bookingId) => deleteBooking(bookingId),
      //   mutationKey: ["bookings"],

      onSuccess: () => {
        toast.success("booking successfully deleted");
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },

      onError: () => {
        toast.error("There was some problem deleting booking");
      },
    }
  );

  return { deletingBooking, isDeletingBooking };
}
