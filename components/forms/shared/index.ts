import FieldRow from "@/components/forms/shared/field-row";
import SubmitRow from "@/components/forms/shared/submit-row";
import Field from "./field";

// components/forms/registration/types.ts
import { ActionState } from "@/lib/actions/tournaments";
import { RegisterEventView } from "@/lib/view-models/events";

export interface BaseFormProps {
  state: ActionState;
  // This matches the signature of the action returned by useActionState
  action: (payload: FormData) => void; 
  isPending: boolean;
  event: RegisterEventView;
}


export { Field, FieldRow, SubmitRow };