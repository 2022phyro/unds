"use client";

import { useActionState } from "react";
import type { TournamentConfig } from "@prisma/client";
import { updateTournamentAction, type ActionState } from "@/lib/actions/tournaments";
import { TournamentFormFields } from "../_components/tournament-form-fields";

const initialState: ActionState = {};

export default function EditTournamentForm({ tournament }: { tournament: TournamentConfig }) {
  const updateWithId = updateTournamentAction.bind(null, tournament.id);
  const [state, formAction, isPending] = useActionState(updateWithId, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <TournamentFormFields tournament={tournament} />
      {state.error && <p className="text-xs font-manrope text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-3 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
