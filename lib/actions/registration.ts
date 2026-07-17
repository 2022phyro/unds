"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type RegistrationType = "TEAM" | "ADJ" | "INDIVIDUAL" | "PS_REG" | "PS_ADJ";

export async function deleteRegistrationAction(
  id: string,
  type: RegistrationType,
  tournamentId: string
) {
  try {
    switch (type) {
      case "TEAM":
        await db.teamRegistration.delete({ where: { id } });
        break;
      case "ADJ":
        await db.adjudicatorRegistration.delete({ where: { id } });
        break;
      case "INDIVIDUAL":
        await db.individualRegistration.delete({ where: { id } });
        break;
      case "PS_REG":
        await db.psRegistration.delete({ where: { id } });
        break;
      case "PS_ADJ":
        await db.psAdjudicatorRegistration.delete({ where: { id } });
        break;
    }
    
    revalidatePath(`/admin/tournaments/${tournamentId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete registration:", error);
    return { error: "Failed to delete" };
  }
}