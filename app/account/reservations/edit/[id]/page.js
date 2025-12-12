import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { id } = await params;
  const booking = await getBooking(id);
  const { id: reservationId, cabinId } = booking;
  const { maxCapacity } = await getCabin(cabinId);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <UpdateReservationForm
        reservationId={id}
        booking={booking}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
