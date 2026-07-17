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
        title="Debate Teams"
        type="TEAM"
        tournamentId={id}
        data={tournament.teamRegistrations}
        columns={[
          { header: "Team", accessorKey: "teamName" },
          { header: "Institution", accessorKey: "institution" },
          { header: "Speaker 1", accessorKey: "player1" }, // Matches renderCell logic
          { header: "Speaker 2", accessorKey: "player2" }, // Matches renderCell logic
        ]}
      />

      {/* Example for Adjudicators */}
      <RegistrationTable
        title="Debate Adjudicators"
        type="ADJ"
        tournamentId={id}
        data={tournament.adjudicatorRegistrations}
        columns={[
          { header: "Name", accessorKey: "name" },
          { header: "Email", accessorKey: "email" },
        ]}
      />

              {/* Example for Adjudicators */}
      <RegistrationTable
        title="PS Registrations"
        type="PS_REG"
        tournamentId={id}
        data={tournament.psRegistrations}
        columns={[
          { header: "Name", accessorKey: "name" },
          { header: "Email", accessorKey: "email" },
        ]}
      />

        
      <RegistrationTable
        title="PS Adjudicators"
        type="PS_ADJ"
        tournamentId={id}
        data={tournament.psAdjudicatorRegistrations}
        columns={[
          { header: "Name", accessorKey: "name" },
          { header: "Email", accessorKey: "email" },
        ]}
      />
    </div>
  );
}
