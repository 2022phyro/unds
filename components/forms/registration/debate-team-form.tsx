import { Info } from "lucide-react";
import { BaseFormProps, Field, FieldRow, SubmitRow } from "../shared";
import { FormError } from "../shared/form-error";

export function DebateTeamForm({ state, action, isPending, event }: BaseFormProps) {
  const requiresInstitutionalAdjudicator =
    event.registrationType === "TEAM" &&
    (event.adjudicatorPolicy === "N_PLUS_ONE" ||
      event.adjudicatorPolicy === "FIXED");

  return (
    <form action={action} className="space-y-6 w-full">
      <FieldRow>
        <Field label="Faculty / Department" name="institution" />
        <Field label="Team Name" name="teamName" />
      </FieldRow>

      <FieldRow>
        <Field label="Speaker 1 Name" name="player1Name" />
        <Field label="Speaker 1 Email" name="player1Email" type="email" />
      </FieldRow>

      <FieldRow>
        <Field label="Speaker 2 Name" name="player2Name" />
        <Field label="Speaker 2 Email" name="player2Email" type="email" />
      </FieldRow>
      {requiresInstitutionalAdjudicator && (
        <div className="border-t border-[#2e3a28]/10 pt-5 mt-5 space-y-4">
          <div className="flex items-start gap-2 text-xs text-text-muted bg-[color-mix(in_srgb,var(--surface)_90%,black)] p-3 rounded-xs border border-[#2e3a28]/10">
            <Info className="w-4 h-4 shrink-0 text-primary" />
            <div>
              <strong className="text-text-primary">
                Institutional Adjudicator Required:
              </strong>{" "}
              This tournament enforces an{" "}
              <strong>{event.adjudicatorPolicy?.replace("_", " ")}</strong>{" "}
              policy. Your team's registration must register an associated
              institutional adjudicator below.
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Adjudicator Full Name"
              name="adjName"
              placeholder="Adj Name"
            />
            <Field
              label="Adjudicator Email"
              name="adjEmail"
              type="email"
              placeholder="adj@example.com"
            />
          </div>
        </div>
      )}

      {state?.error && <FormError>{state.error}</FormError>}
      <SubmitRow isPending={isPending} />
    </form>
  );
}
