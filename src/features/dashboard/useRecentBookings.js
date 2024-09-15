import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searcheParams] = useSearchParams();

  const numDays = !searcheParams.get("last")
    ? 7
    : Number(searcheParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookings, isLoading, numDays };
}
