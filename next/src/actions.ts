"use server";

import { redirect } from "next/navigation";

export async function navigate(roomId: string) {
  redirect(`/${roomId}`);
}
