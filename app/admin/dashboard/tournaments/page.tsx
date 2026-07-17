import Link from "next/link";
import { db } from "@/lib/db";
import { deleteTournamentAction } from "@/lib/actions/tournaments";
import { DeleteButton } from "@/components/ui/delete-button";

export default async function AdminTournamentsPage() {
  const tournaments = await db.tournamentConfig.findMany({
    orderBy: { sortDate: "desc" },
    include: {
      _count: {
        select: {
          teamRegistrations: true,
          adjudicatorRegistrations: true,
          individualRegistrations: true,
          psRegistrations: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">
          Tournaments
        </h1>
        <Link
          href="/admin/dashboard/tournaments/new"
          className="px-4 py-2 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold"
        >
          + New Tournament
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
          <thead>
            <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
              <th className="p-2">Title</th>
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Teams</th>
              <th className="p-2">Adjudicators</th>
              <th className="p-2">PS</th>
              <th className="p-2" />
            </tr>
          </thead>
          <tbody>
            {tournaments.map((t) => (
              <tr key={t.id} className="border-b border-[#2e3a28]/5">
                <td className="p-2 font-bold">{t.title}</td>
                <td className="p-2">{t.type}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2">{t._count.teamRegistrations}</td>
                <td className="p-2">{t._count.adjudicatorRegistrations}</td>
                <td className="p-2">
                  {t.includesPS ? t._count.psRegistrations : "—"}
                </td>
                <td className="p-2">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/dashboard/tournaments/${t.id}`}
                      className="text-[#2e3a28] font-bold"
                    >
                      Edit
                    </Link>
                    <form action={deleteTournamentAction.bind(null, t.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {tournaments.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-text-muted">
                  No tournaments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
