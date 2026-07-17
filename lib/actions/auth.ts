"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  isAuthorizedStaff,
} from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  password: z.string().min(1, { error: "Password is required." }),
});

export interface LoginActionState {
  error?: string;
}

export async function loginAdminAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const allowed = await checkRateLimit("login");
  if (!allowed) {
    return { error: "Too many attempts. Try again in a minute." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user) {
    return { error: "Invalid credentials." };
  }
  if (!user.passwordHash) {
    return { error: "Invalid credentials." };
  }
  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid credentials." };
  }

  const session = {
    userId: user.id,
    email: user.email,
    role: user.role,
    isStaff: user.isStaff,
  };
  if (!isAuthorizedStaff(session)) {
    return { error: "This account does not have staff access." };
  }

  const token = await createSessionToken(session);
  await setSessionCookie(token);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}
