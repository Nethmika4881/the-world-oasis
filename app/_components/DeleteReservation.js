"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservationAction } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteReservationAction(bookingId);
    });
  }
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="group flex items-center justify-center cursor-pointer gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {isPending ? (
        <SpinnerMini />
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
