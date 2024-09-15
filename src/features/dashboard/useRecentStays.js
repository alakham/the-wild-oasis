import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searcheParams] = useSearchParams();

  const numStayDays = !searcheParams.get("last")
    ? 7
    : Number(searcheParams.get("last"));

  const queryStayDay = subDays(new Date(), numStayDays).toISOString();

  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryStayDay),
    queryKey: ["stays", `last-${numStayDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, isLoadingStays, confirmedStays };
}
