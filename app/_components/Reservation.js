import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();
  return (
    <div className="grid gap-10 min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm
          cabinMaxCapacity={cabin.maxCapacity}
          user={session?.user}
        />
      ) : (
        <LoginMessage />
      )}{" "}
    </div>
  );
}

export default Reservation;
