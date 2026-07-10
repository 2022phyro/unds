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

  const [teams, adjudicators] = await Promise.all([
    db.teamRegistration.findMany({ where: { tournamentId }, orderBy: { teamName: "asc" } }),
    db.adjudicatorRegistration.findMany({ where: { tournamentId }, orderBy: { name: "asc" } }),
  ]);

  const lines: string[] = [];
  lines.push("Team Name,Institution,Speaker 1,Speaker 1 Email,Speaker 2,Speaker 2 Email");
  for (const team of teams) {
    const [speaker1, speaker2] =
      team.player1Name.localeCompare(team.player2Name) <= 0
        ? [
            { name: team.player1Name, email: team.player1Email },
            { name: team.player2Name, email: team.player2Email },
          ]
        : [
            { name: team.player2Name, email: team.player2Email },
            { name: team.player1Name, email: team.player1Email },
          ];

    lines.push(
      [team.teamName, team.institution, speaker1.name, speaker1.email, speaker2.name, speaker2.email]
        .map(csvEscape)
        .join(","),
    );
  }

  lines.push("");
  lines.push("Independent Adjudicators");
  lines.push("Adjudicator Name,Adjudicator Email");
  for (const adjudicator of adjudicators) {
    lines.push([adjudicator.name, adjudicator.email].map(csvEscape).join(","));
  }

  const csv = lines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="entrants-${tournamentId}.csv"`,
    },
  });
}
