import { BaseFormProps, Field, SubmitRow } from "../shared";
import { FormError } from "../shared/form-error";

export function AdjudicatorForm({
  state,
  action,
  isPending,
  event,
}: BaseFormProps) {
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
