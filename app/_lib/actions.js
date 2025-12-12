"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  const guestId = session?.user?.guestId;
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (!/^(?:[0-9]{9}[VvXx]|[0-9]{12})$/.test(nationalID)) {
    throw new Error("Please enter a valid NIC number");
  }
  const updatedFields = { nationalID, nationality, countryFlag };
  await updateGuest(guestId, updatedFields);
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  const bookings = await getBookings(session?.user?.guestId);
  const Ids = bookings.map((booking) => booking.id);
  if (!Ids.includes(bookingId))
    throw new Error("You're not allowed to delete this booking");
  if (!session) throw new Error("You must be logged in ");
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  const reservationId = Number(formData.get("reservationId"));
  const numOfGuests = Number(formData.get("numOfGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const updatedFields = { numOfGuests, observations };

  await updateBooking(reservationId, updatedFields);
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  const newBookingData = {
    ...bookingData,
    guestID: session?.user?.guestId,
    numOfGuests: Number(formData.get("numOfGuests")),
    observations: (formData.get("observations") || "").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBookingData);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/thankyou");
}
