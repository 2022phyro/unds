import { Info, Lock } from "lucide-react";
import { BaseFormProps, Field, FieldRow, SubmitRow } from "../shared";
import { FormError } from "../shared/form-error";

export function DebateTeamForm({ state, action, isPending, event }: BaseFormProps) {
  const isLocked = event.registrationLocked;

  if (isLocked) {
    return (
      <div className="w-full bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28] p-8 rounded-xs flex flex-col items-center text-center gap-4 my-6">
        <div className="w-12 h-12 rounded-xs bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-garamond text-xl font-bold text-text-primary">
            Debate Registration Closed
          </h3>
          <p className="font-garamond text-sm text-text-secondary max-w-md leading-relaxed">
            Team debate registration for this event is currently closed. Please contact the tournament organizers or the adjudication desk if you have inquiries.
          </p>
        </div>
        <div className="pt-2">
          <a
            href="https://wa.me/qr/7OO5DRWMWX6JF1"
            className="inline-flex items-center justify-center font-ui text-xs tracking-wider border border-primary/30 text-primary hover:bg-primary/5 transition-colors px-4 py-2.5 rounded-xs font-semibold"
          >
            Contact Adjudication Desk
          </a>
        </div>
      </div>
    );
  }

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