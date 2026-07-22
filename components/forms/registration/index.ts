import dynamic from "next/dynamic";
import type { BaseFormProps } from "../shared";
import type { ComponentType } from "react";
import FormSkeleton from "../shared/skeleton";




const DebateTeamForm = dynamic(
  () => import("./debate-team-form").then((m) => m.DebateTeamForm),
  { loading: FormSkeleton },
);
const IndividualForm = dynamic(
  () => import("./individual-form").then((m) => m.IndividualForm),
  { loading: FormSkeleton },
);
const PSTeamForm = dynamic(
  () => import("./ps-team-form").then((m) => m.PSTeamForm),
  { loading: FormSkeleton },
);
const AdjudicatorForm = dynamic(
  () => import("./adjudicator-form").then((m) => m.AdjudicatorForm),
  { loading: FormSkeleton },
);
const PSAdjudicatorForm = dynamic(
  () => import("./ps-adjudication").then((m) => m.AdjudicatorForm),
  { loading: FormSkeleton },
);

export const FORM_REGISTRY: Record<string, ComponentType<BaseFormProps>> = {
  "DEBATE.PARTICIPANT": DebateTeamForm,
  "DEBATE.INDIVIDUAL": IndividualForm,
  "PS.PARTICIPANT": PSTeamForm,
  "PS.ADJUDICATOR": PSAdjudicatorForm,
  "DEBATE.ADJUDICATOR": AdjudicatorForm,
};

export type FormKeys = keyof typeof FORM_REGISTRY;