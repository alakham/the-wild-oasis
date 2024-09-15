import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Statistics({ bookings, confirmedStays, numDays, cabinCount }) {
  //  1 - Number of bookings
  const numbookings = bookings.length;
  //    2 - calculating sales

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //    3 - calculating confirmed stays

  const checkins = confirmedStays.length;

  //   4 - calculating occupancy

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  confirmedStays.numNights;

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numbookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + `%`}
      />
    </>
  );
}

export default Statistics;
