"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
  console.log(formData);

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
