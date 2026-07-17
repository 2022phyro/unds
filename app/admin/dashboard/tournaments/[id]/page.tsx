import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { deleteTournamentAction } from "@/lib/actions/tournaments";
import EditTournamentForm from "./edit-tournament-form";
import { RegistrationTable } from "../_components/registration-table";

interface EditTournamentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTournamentPage({
  params,
}: EditTournamentPageProps) {
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
        <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">
          Edit Tournament
        </h1>
        <form action={deleteTournamentAction.bind(null, tournament.id)}>
          <button
            type="submit"
            className="text-red-700 font-bold text-xs font-ui tracking-wider cursor-pointer"
          >
            Delete
          </button>
        </form>
      </div>

      <EditTournamentForm tournament={tournament} />

      <RegistrationTable
        title="Teams"
        type="TEAM"
        tournamentId={id}
        data={tournament.teamRegistrations}
        exportUrl={`/api/admin/export-entrants?tournamentId=${id}`}
        columns={[
          {
            header: "Team",
            accessor: (t) => <span className="font-bold">{t.teamName}</span>,
          },
          { header: "Institution", accessor: (t) => t.institution },
          {
            header: "Speaker 1",
            accessor: (t) => `${t.player1Name} (${t.player1Email})`,
          },
          {
            header: "Speaker 2",
            accessor: (t) => `${t.player2Name} (${t.player2Email})`,
          },
        ]}
      />

      <RegistrationTable
        title="Adjudicators"
        type="ADJ"
        tournamentId={id}
        data={tournament.adjudicatorRegistrations}
        columns={[
          {
            header: "Name",
            accessor: (a) => <span className="font-bold">{a.name}</span>,
          },
          { header: "Email", accessor: (a) => a.email },
        ]}
      />

      {/* Repeat for other tables as needed */}
    </div>
  );
}
