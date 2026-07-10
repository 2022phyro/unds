"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession, isAuthorizedStaff } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";
import { newsletterSchema } from "@/lib/validations/newsletterSchema";

export interface NewsletterActionState {
  error?: string;
  success?: boolean;
}

export async function subscribeNewsletterAction(
  source: string,
  _prevState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const allowed = await checkRateLimit("newsletter");
  if (!allowed) return { error: "Too many attempts. Try again in a minute." };

  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid email address." };
  }

  await db.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: {},
    create: { email: parsed.data.email, source },
  });

  revalidatePath("/admin/dashboard/subscribers");
  return { success: true };
}

async function requireStaff() {
  const session = await getSession();
  if (!isAuthorizedStaff(session)) {
    throw new Error("Not authorized.");
  }
}

export async function unsubscribeAction(subscriberId: string) {
  await requireStaff();
  await db.newsletterSubscriber.delete({ where: { id: subscriberId } });
  revalidatePath("/admin/dashboard/subscribers");
}
