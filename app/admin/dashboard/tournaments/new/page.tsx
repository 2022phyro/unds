"use client";

import { useActionState } from "react";
import { createTournamentAction, type ActionState } from "@/lib/actions/tournaments";
import { TournamentFormFields } from "../_components/tournament-form-fields";

const initialState: ActionState = {};

export default function NewTournamentPage() {
  const [state, formAction, isPending] = useActionState(createTournamentAction, initialState);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">New Tournament</h1>
      <form action={formAction} className="space-y-4">
        <TournamentFormFields />
        {state.error && <p className="text-xs font-manrope text-red-700">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-3 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Create Tournament"}
        </button>
      </form>
    </div>
  );
}
