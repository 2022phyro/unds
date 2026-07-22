import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getSession, isAuthorizedStaff } from "@/lib/auth/session";

function csvEscape(value: string | null | undefined): string {
  if (!value) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!isAuthorizedStaff(session)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const tournamentId = searchParams.get("tournamentId");
  const type = searchParams.get("type") || "TEAM"; // Defaults to TEAM if type is omitted

  if (!tournamentId) {
    return NextResponse.json({ error: "tournamentId is required." }, { status: 400 });
  }

  const lines: string[] = [];
  const tournament = await db.tournamentConfig.findUnique({
    where: { id: tournamentId },
  });

  if (!tournament) {
    return NextResponse.json({ error: "Tournament not found." }, { status: 404 });
  }
  let filename = `export-${tournament.slug}-${tournamentId}.csv`;

  switch (type) {
    case "TEAM": {
      const teams = await db.teamRegistration.findMany({
        where: { tournamentId },
        orderBy: { teamName: "asc" },
      });
      filename = `debate-teams-${tournamentId}.csv`;
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
          [
            team.teamName,
            team.institution,
            speaker1.name,
            speaker1.email,
            speaker2.name,
            speaker2.email,
          ]
            .map(csvEscape)
            .join(",")
        );
      }
      break;
    }

    case "INDIVIDUAL": {
      const individuals = await db.individualRegistration.findMany({
        where: { tournamentId },
        orderBy: { name: "asc" },
      });
      filename = `debate-individuals-${tournamentId}.csv`;
      lines.push("Name,Email,Institution");

      for (const ind of individuals) {
        lines.push([ind.name, ind.email, ind.institution].map(csvEscape).join(","));
      }
      break;
    }

    case "ADJ": {
      const adjudicators = await db.adjudicatorRegistration.findMany({
        where: { tournamentId },
        orderBy: { name: "asc" },
      });
      filename = `debate-adjudicators-${tournamentId}.csv`;
      lines.push("Adjudicator Name,Adjudicator Email,Institution");

      for (const adjudicator of adjudicators) {
        lines.push([adjudicator.name, adjudicator.email, adjudicator.institution].map(csvEscape).join(","));
      }
      break;
    }

    case "PS_REG": {
      const speakers = await db.pSRegistration.findMany({
        where: { tournamentId },
        orderBy: { name: "asc" },
      });
      filename = `ps-registrations-${tournamentId}.csv`;
      lines.push("Speaker Name,Speaker Email,Institution");

      for (const speaker of speakers) {
        lines.push([speaker.name, speaker.email, speaker.institution].map(csvEscape).join(","));
      }
      break;
    }

    case "PS_ADJ": {
      const adjudicators = await db.pSAdjudicatorRegistration.findMany({
        where: { tournamentId },
        orderBy: { name: "asc" },
      });
      filename = `ps-adjudicators-${tournamentId}.csv`;
      lines.push("Adjudicator Name,Adjudicator Email,Institution");

      for (const adjudicator of adjudicators) {
        lines.push([adjudicator.name, adjudicator.email, adjudicator.institution].map(csvEscape).join(","));
      }
      break;
    }

    default:
      return NextResponse.json({ error: "Invalid export type." }, { status: 400 });
  }

  const csv = lines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}