import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getSession, isAuthorizedStaff } from "@/lib/auth/session";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!isAuthorizedStaff(session)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const tournamentId = request.nextUrl.searchParams.get("tournamentId");
  if (!tournamentId) {
    return NextResponse.json({ error: "tournamentId is required." }, { status: 400 });
  }

  const [speakers, adjudicators] = await Promise.all([
    db.pSRegistration.findMany({ where: { tournamentId }, orderBy: { name: "asc" } }),
    db.pSAdjudicatorRegistration.findMany({ where: { tournamentId }, orderBy: { name: "asc" } }),
  ]);

  const lines: string[] = [];
  lines.push("Speaker Name,Speaker Email,Institution");
  for (const speaker of speakers) {
    lines.push([speaker.name, speaker.email, speaker.institution].map(csvEscape).join(","));
  }

  lines.push("");
  lines.push("Public Speaking Adjudicators");
  lines.push("Adjudicator Name,Adjudicator Email");
  for (const adjudicator of adjudicators) {
    lines.push([adjudicator.name, adjudicator.email].map(csvEscape).join(","));
  }

  const csv = lines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ps-entrants-${tournamentId}.csv"`,
    },
  });
}
