/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {

  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, current) => acc + current.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Booking"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />

      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check ins"
        icon={<HiOutlineCalendar />}
        color="indigo"
        value={checkins}
      />

      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
