import { BaseFormProps, Field, SubmitRow } from "../shared";
import { FormError } from "../shared/form-error";
import { Lock } from "lucide-react";

export function AdjudicatorForm({
  state,
  action,
  isPending,
  event,
}: BaseFormProps) {
  // Check if registration is locked using your granular flag schema
  const isLocked = event.psAdjudicationLocked ?? !event.psAdjudicatorsAllowed;

  if (isLocked) {
    return (
      <div className="w-full bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28] p-8 rounded-xs flex flex-col items-center text-center gap-4 my-6">
        <div className="w-12 h-12 rounded-xs bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Lock className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-garamond text-xl font-bold text-text-primary">
            Adjudication Registration Closed
          </h3>
          <p className="font-garamond text-sm text-text-secondary max-w-md leading-relaxed">
            Public Speaking adjudicator registration is currently closed. Please
            contact the tournament organizers or the adjudication desk if you
            require special accommodation.
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

  return (
    <form action={action} className="flex flex-col gap-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          name="name"
          placeholder="Your First & Last Name"
        />
        <Field
          label="Contact Email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <Field
        label="Faculty / Department"
        name="institution"
        placeholder="e.g. Civil Engineering/Engineering"
      />
      {state?.error && <FormError>{state.error}</FormError>}
      <SubmitRow isPending={isPending} />
    </form>
  );
}
