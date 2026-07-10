import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { deleteTournamentAction } from "@/lib/actions/tournaments";
import EditTournamentForm from "./edit-tournament-form";

interface EditTournamentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTournamentPage({ params }: EditTournamentPageProps) {
  const { id } = await params;

  const tournament = await db.tournamentConfig.findUnique({
    where: { id },
    include: {
      teamRegistrations: { orderBy: { teamName: "asc" } },
      adjudicatorRegistrations: { orderBy: { name: "asc" } },
      individualRegistrations: { orderBy: { name: "asc" } },
      psRegistrations: { orderBy: { name: "asc" } },
      psAdjudicatorRegistrations: { orderBy: { name: "asc" } },
    },
  });
  if (!tournament) notFound();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">Edit Tournament</h1>
        <form action={deleteTournamentAction.bind(null, tournament.id)}>
          <button type="submit" className="text-red-700 font-bold text-xs font-ui tracking-wider cursor-pointer">
            Delete
          </button>
        </form>
      </div>

      <EditTournamentForm tournament={tournament} />

      <div className="space-y-4 border-t border-[#2e3a28]/10 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-garamond text-lg font-bold text-[#2e3a28]">Roster & Copy Desk</h2>
          <a
            href={`/api/admin/export-entrants?tournamentId=${tournament.id}`}
            className="px-4 py-2 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold"
          >
            Export CSV
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
            <thead>
              <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
                <th className="p-2">Team</th>
                <th className="p-2">Institution</th>
                <th className="p-2">Speaker 1</th>
                <th className="p-2">Speaker 2</th>
              </tr>
            </thead>
            <tbody>
              {tournament.teamRegistrations.map((team) => (
                <tr key={team.id} className="border-b border-[#2e3a28]/5">
                  <td className="p-2 font-bold">{team.teamName}</td>
                  <td className="p-2">{team.institution}</td>
                  <td className="p-2">
                    {team.player1Name} ({team.player1Email})
                  </td>
                  <td className="p-2">
                    {team.player2Name} ({team.player2Email})
                  </td>
                </tr>
              ))}
              {tournament.teamRegistrations.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-text-muted">
                    No team registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
            <thead>
              <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
                <th className="p-2">Adjudicator</th>
                <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {tournament.adjudicatorRegistrations.map((adj) => (
                <tr key={adj.id} className="border-b border-[#2e3a28]/5">
                  <td className="p-2 font-bold">{adj.name}</td>
                  <td className="p-2">{adj.email}</td>
                </tr>
              ))}
              {tournament.adjudicatorRegistrations.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-text-muted">
                    No adjudicator registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {tournament.individualRegistrations.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
              <thead>
                <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
                  <th className="p-2">Individual Entrant</th>
                  <th className="p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {tournament.individualRegistrations.map((entry) => (
                  <tr key={entry.id} className="border-b border-[#2e3a28]/5">
                    <td className="p-2 font-bold">{entry.name}</td>
                    <td className="p-2">{entry.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {tournament.includesPS && (
        <div className="space-y-4 border-t border-[#2e3a28]/10 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-garamond text-lg font-bold text-[#2e3a28]">Public Speaking Roster</h2>
            <a
              href={`/api/admin/export-ps-entrants?tournamentId=${tournament.id}`}
              className="px-4 py-2 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold"
            >
              Export PS CSV
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
              <thead>
                <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
                  <th className="p-2">Speaker</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Institution</th>
                </tr>
              </thead>
              <tbody>
                {tournament.psRegistrations.map((entry) => (
                  <tr key={entry.id} className="border-b border-[#2e3a28]/5">
                    <td className="p-2 font-bold">{entry.name}</td>
                    <td className="p-2">{entry.email}</td>
                    <td className="p-2">{entry.institution}</td>
                  </tr>
                ))}
                {tournament.psRegistrations.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-text-muted">
                      No Public Speaking registrations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {tournament.psAdjudicatorsAllowed && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
                <thead>
                  <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
                    <th className="p-2">PS Adjudicator</th>
                    <th className="p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {tournament.psAdjudicatorRegistrations.map((adj) => (
                    <tr key={adj.id} className="border-b border-[#2e3a28]/5">
                      <td className="p-2 font-bold">{adj.name}</td>
                      <td className="p-2">{adj.email}</td>
                    </tr>
                  ))}
                  {tournament.psAdjudicatorRegistrations.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-text-muted">
                        No Public Speaking adjudicator registrations yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
