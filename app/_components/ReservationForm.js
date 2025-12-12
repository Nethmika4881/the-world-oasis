"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_context/Reservation";
import { createBookingAction } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { regularPrice, discount, id: cabinId } = cabin;
  const startDate = range.from;
  const endDate = range.to;

  const numOfNights = differenceInDays(endDate, startDate);
  const cabinPrice = numOfNights * (regularPrice - discount);

  const bookingData = { startDate, endDate, numOfNights, cabinPrice, cabinId };
  const createBookingWithDataAction = createBookingAction.bind(
    null,
    bookingData //this booking data set as the first argument of the createbookingdataaction.so when we try to access form data from that function we will get this.so formdata will be the next argument then
  ); //we want to transfer data to the server action
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user?.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={async (formData) => {
          await createBookingWithDataAction(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numOfGuests">How many guests?</label>
          <select
            name="numOfGuests"
            id="numOfGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <Button />
        </div>
      </form>
    </div>
  );
}

const Button = function () {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? <SpinnerMini /> : "Reserve now"}
    </button>
  );
};

export default ReservationForm;
