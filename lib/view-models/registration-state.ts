export type RegistrationType = "NONE" | "TEAM" | "INDIVIDUAL";
export type AdjudicatorPolicy = "NONE" | "OPEN" | "N_PLUS_ONE" | "FIXED";

// Minimal slice of EventDetailView this derivation actually needs — keeps
// the function testable without constructing a full event object.
export interface RegistrationStateInput {
  registrationType: RegistrationType;
  adjudicatorPolicy: AdjudicatorPolicy;
  includesPS: boolean;
  psAdjudicatorsAllowed: boolean;
  registrationLocked: boolean;
  adjudicationRegistrationLocked: boolean;
  psRegistrationLocked: boolean;
  psAdjudicationLocked: boolean;
  registrationUrl?: string;
}

export interface RegistrationEntry {
  key: "debate-main" | "debate-adjudicator" | "ps-main" | "ps-adjudicator";
  label: string;
  href: string;
  locked: boolean;
}

export interface RegistrationState {
  /** No internal registration mechanism at all — either a bare external
   * link or a plain "just attend" listing. */
  isListingOnly: boolean;
  entries: RegistrationEntry[];
}

export function getRegistrationState(
  event: RegistrationStateInput,
  eventId: string,
): RegistrationState {
  const entries: RegistrationEntry[] = [];

  const debateOffered = event.registrationType !== "NONE";
  if (debateOffered) {
    const mode = event.registrationType === "TEAM" ? "participant" : "individual";
    entries.push({
      key: "debate-main",
      label: event.registrationType === "TEAM" ? "Register Your Team" : "Register to Participate",
      href: `/events/${eventId}/register?track=debate&mode=${mode}`,
      locked: event.registrationLocked,
    });
  }

  const debateAdjudicatorOffered = event.adjudicatorPolicy !== "NONE";
  if (debateAdjudicatorOffered) {
    entries.push({
      key: "debate-adjudicator",
      label: "Register — Adjudicator",
      href: `/events/${eventId}/register?track=debate&mode=adjudicator`,
      locked: event.adjudicationRegistrationLocked,
    });
  }

  if (event.includesPS) {
    entries.push({
      key: "ps-main",
      label: "Register — Public Speaking",
      href: `/events/${eventId}/register?track=ps&mode=participant`,
      locked: event.psRegistrationLocked,
    });

    if (event.psAdjudicatorsAllowed) {
      entries.push({
        key: "ps-adjudicator",
        label: "Register — PS Adjudicator",
        href: `/events/${eventId}/register?track=ps&mode=adjudicator`,
        locked: event.psAdjudicationLocked,
      });
    }
  }

  return {
    isListingOnly: !debateOffered && !event.includesPS,
    entries,
  };
}