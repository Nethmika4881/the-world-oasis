"use client";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../_context/Reservation";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ bookedDates, settings, cabin }) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = cabin.regularPrice;
  const discount = cabin.discount;
  const numNights = cabin.numOfNights;
  const cabinPrice = cabin.regularPrice;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex gap-15 flex-col justify-between">
      <DayPicker
        className="pt-12 ml-2 text-[0.7rem] max-w-[550] mx-auto"
        classNames={{
          caption_label: "text-sm  block text-center  font-medium", // Target the actual text
          months: "flex flex-row gap-6  justify-center items-start", // ✅ Side by side, centered
          month: "flex-1 min-w-0", // ✅ Equal width, responsive

          table: "w-full", // ✅ Full width table
          day: "p-.1",
        }}
        onSelect={(range) => setRange(range)}
        selected={range}
        mode="range"
        min={minBookingLength}
        max={maxBookingLength - 1}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        hideNavigation
        disabled={bookedDates}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 cursor-pointer text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
