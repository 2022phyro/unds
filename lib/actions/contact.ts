"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession, isAuthorizedStaff } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations/contactSchema";

export interface ContactActionState {
  error?: string;
  success?: boolean;
}

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const allowed = await checkRateLimit("contact");
  if (!allowed) return { error: "Too many messages. Try again in a minute." };

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  await db.contactMessage.create({
    data: {
      name: `${parsed.data.firstName} ${parsed.data.lastName}`,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
  });

  revalidatePath("/admin/dashboard/inquiries");
  return { success: true };
}

async function requireStaff() {
  const session = await getSession();
  if (!isAuthorizedStaff(session)) {
    throw new Error("Not authorized.");
  }
}

export async function resolveContactAction(messageId: string) {
  await requireStaff();
  await db.contactMessage.update({ where: { id: messageId }, data: { resolved: true } });
  revalidatePath("/admin/dashboard/inquiries");
}
