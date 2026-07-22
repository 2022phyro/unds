import { Lock } from "lucide-react";
import { Button } from "@/components/ui/bookmark-button";
import {
  getRegistrationState,
  type RegistrationStateInput,
} from "@/lib/view-models/registration-state";

interface RegistrationCalloutProps {
  event: RegistrationStateInput & {
    registrationUrl?: string;
  };
  eventId: string;
}

// Builds the heading + one sentence per offered stream describing whether
// it's open or currently locked. Data-driven so it scales to any
// combination (debate only, PS only, both, with/without adjudicators)
// without hand-writing prose for every case.
function describeRegistration(
  event: RegistrationCalloutProps["event"],
  entries: ReturnType<typeof getRegistrationState>["entries"],
) {
  const debateMain = entries.find((e) => e.key === "debate-main");
  const debateAdj = entries.find((e) => e.key === "debate-adjudicator");
  const psMain = entries.find((e) => e.key === "ps-main");
  const psAdj = entries.find((e) => e.key === "ps-adjudicator");

  const hasDebate = Boolean(debateMain);
  const hasPS = Boolean(psMain);

  const title =
    hasDebate && hasPS
      ? "Registration"
      : hasDebate
        ? "Debate Registration"
        : hasPS
          ? "Public Speaking Registration"
          : "Everyone's Welcome";

  const sentences: string[] = [];

  if (debateMain) {
    sentences.push(
      debateMain.locked
        ? "Debate registration is currently locked — capacity may have been reached or the window has closed."
        : event.registrationType === "TEAM"
          ? "Register your team together — you'll provide your members' details so we can prepare the draw and schedule."
          : "Register to reserve your place — it only takes a couple of minutes.",
    );
  }

  if (debateAdj) {
    sentences.push(
      debateAdj.locked
        ? "Adjudicator registration for the debate stream is currently locked."
        : "Independent adjudicators are welcome to register separately for the debate stream.",
    );
  }

  if (psMain) {
    sentences.push(
      psMain.locked
        ? "Public Speaking registration is currently locked."
        : "Interested in Public Speaking? That's a separate quick registration.",
    );
  }

  if (psAdj) {
    sentences.push(
      psAdj.locked
        ? "Public Speaking adjudicator registration is currently locked."
        : "Adjudicators for the Public Speaking stream can also register separately.",
    );
  }

  if (!hasDebate && !hasPS) {
    sentences.push(
      "This event is open to everyone. No registration is required—just come along with your curiosity, a notebook if you'd like, and be ready to take part.",
    );
  }

  return { title, description: sentences.join(" ") };
}

export function RegistrationCallout({ event, eventId }: RegistrationCalloutProps) {
  const { isListingOnly, entries } = getRegistrationState(event, eventId);
  const { title, description } = describeRegistration(event, entries);

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28] w-full flex flex-col sm:flex-row justify-start items-center p-6 gap-6">
        <div className="space-y-1 flex flex-col gap-2">
          <h3 className="font-garamond text-xl font-bold text-text-primary">{title}</h3>
          <p className="font-garamond text-sm text-text-secondary max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col w-full sm:w-auto justify-evenly items-stretch flex-wrap gap-3">
          {isListingOnly ? (
            event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 btn bg-primary dark:bg-white border border-[#2e3a28] font-ui! text-xs! text-(--evergreen)! tracking-wider font-bold rounded-xs"
              >
                View External Listing
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 btn bg-primary dark:bg-white border border-[#2e3a28] font-ui! text-xs! text-(--evergreen)! tracking-wider font-bold rounded-xs">
                Just Attend
              </div>
            )
          ) : (
            entries.map((entry) =>
              entry.locked ? (
                <div
                  key={entry.key}
                  title="Registration is currently closed for this stream"
                  className="inline-flex items-center justify-center gap-2 h-12 w-full sm:w-60 px-4 rounded-xs border border-[#2e3a28]/20 bg-[#2e3a28]/5 text-text-muted text-xs font-manrope font-medium capitalize cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  {entry.label} — Locked
                </div>
              ) : (
                <Button
                  key={entry.key}
                  href={entry.href}
                  className="font-manrope h-12 w-full sm:w-60 capitalize font-medium"
                  aria-label={entry.label}
                >
                  {entry.label}
                </Button>
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
}