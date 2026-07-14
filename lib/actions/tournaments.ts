"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession, isAuthorizedStaff } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";
import { tournamentSchema } from "@/lib/validations/tournamentSchema";
import {
  teamRegistrationSchema,
  adjudicatorRegistrationSchema,
  individualRegistrationSchema,
  psRegistrationSchema,
  psAdjudicatorRegistrationSchema,
} from "@/lib/validations/registrationSchema";

export interface ActionState {
  error?: string;
  success?: boolean;
}

async function requireStaff() {
  const session = await getSession();
  if (!isAuthorizedStaff(session)) {
    throw new Error("Not authorized.");
  }
  return session;
}

// ---------- Admin CRUD ----------

export async function createTournamentAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireStaff();

  const parsed = tournamentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid tournament data.",
    };
  }

  await db.tournamentConfig.create({ data: parsed.data });

  revalidatePath("/admin/dashboard/tournaments");
  revalidatePath("/events");
  redirect("/admin/dashboard/tournaments");
}

export async function updateTournamentAction(
  tournamentId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireStaff();

  const parsed = tournamentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid tournament data.",
    };
  }

  await db.tournamentConfig.update({
    where: { id: tournamentId },
    data: parsed.data,
  });

  revalidatePath("/admin/dashboard/tournaments");
  revalidatePath(`/events/${parsed.data.slug}`);
  revalidatePath("/events");
  redirect("/admin/dashboard/tournaments");
}

export async function deleteTournamentAction(tournamentId: string) {
  await requireStaff();
  await db.tournamentConfig.delete({ where: { id: tournamentId } });
  revalidatePath("/admin/dashboard/tournaments");
  revalidatePath("/events");
}

// ---------- Public registration ----------

export async function registerTeamAction(
  tournamentId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const allowed = await checkRateLimit("register-team");
  if (!allowed) return { error: "Too many attempts. Try again in a minute." };

  const rawData = Object.fromEntries(formData);
  const parsed = teamRegistrationSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid registration.",
    };
  }

  const { adjName, adjEmail, ...teamData } = parsed.data;

  try {
    await db.teamRegistration.create({
      data: {
        tournamentId,
        ...teamData,
        // Convert empty strings to null for database cleanliness
        adjName: adjName?.trim() || null,
        adjEmail: adjEmail?.trim() || null,
      },
    });
  } catch (error) {
    // Helpful log for debugging local integration issues
    console.error("Team registration error:", error);
    return {
      error: "A team with that name is already registered for this tournament.",
    };
  }

  revalidatePath("/admin/dashboard/tournaments");
  return { success: true };
}

export async function registerAdjudicatorAction(
  tournamentId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const allowed = await checkRateLimit("register-adjudicator");
  if (!allowed) return { error: "Too many attempts. Try again in a minute." };

  const parsed = adjudicatorRegistrationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid registration." };
  }

  try {
    await db.adjudicatorRegistration.create({ 
      data: { 
        tournamentId, 
        ...parsed.data 
      } 
    });
  } catch (error) {
    console.error("Adjudicator registration error:", error);
    return { error: "An adjudicator with this email is already registered." };
  }

  revalidatePath("/admin/dashboard/tournaments");
  return { success: true };
}
export async function registerIndividualAction(
  tournamentId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const allowed = await checkRateLimit("register-individual");
  if (!allowed) return { error: "Too many attempts. Try again in a minute." };

  const parsed = individualRegistrationSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid registration.",
    };
  }

  try {
    await db.individualRegistration.create({
      data: { tournamentId, ...parsed.data },
    });
  } catch {
    return { error: "This email is already registered for this tournament." };
  }

  revalidatePath("/admin/dashboard/tournaments");
  return { success: true };
}

export async function registerPSAction(
  tournamentId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const allowed = await checkRateLimit("register-ps");
  if (!allowed) return { error: "Too many attempts. Try again in a minute." };

  const parsed = psRegistrationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid registration.",
    };
  }

  try {
    await db.pSRegistration.create({ data: { tournamentId, ...parsed.data } });
  } catch {
    return {
      error:
        "This email is already registered for Public Speaking at this tournament.",
    };
  }

  revalidatePath("/admin/dashboard/tournaments");
  return { success: true };
}

export async function registerPSAdjudicatorAction(
  tournamentId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const allowed = await checkRateLimit("register-ps-adjudicator");
  if (!allowed) return { error: "Too many attempts. Try again in a minute." };

  const parsed = psAdjudicatorRegistrationSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid registration.",
    };
  }

  try {
    await db.pSAdjudicatorRegistration.create({
      data: { tournamentId, ...parsed.data },
    });
  } catch {
    return {
      error:
        "This email is already registered as a Public Speaking adjudicator for this tournament.",
    };
  }

  revalidatePath("/admin/dashboard/tournaments");
  return { success: true };
}
