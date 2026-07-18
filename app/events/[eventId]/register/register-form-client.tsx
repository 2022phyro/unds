"use client";

import { useActionState, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Gavel, User, Users } from "lucide-react";
import {
  registerTeamAction,
  registerIndividualAction,
  registerAdjudicatorAction,
  registerPSAction,
  registerPSAdjudicatorAction,
  type ActionState,
} from "@/lib/actions/tournaments";
import { FORM_REGISTRY } from "@/components/forms/registration";
import type { RegisterEventView } from "@/lib/view-models/events";
import type { BaseFormProps } from "@/components/forms/shared";

type Mode = "PARTICIPANT" | "ADJUDICATOR" | "INDIVIDUAL";
type Track = "DEBATE" | "PS";

interface RegisterFormClientProps {
  tournamentId: string;
  eventId: string;
  event: RegisterEventView;
  initialTrack: Track;
  initialMode: Mode;
}

const initialState: ActionState = {};

export default function RegisterFormClient({
  tournamentId,
  eventId,
  event,
  initialTrack,
  initialMode,
}: RegisterFormClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const debateAvailable = event.registrationType !== "NONE";
  const psAvailable = event.includesPS;
  const bothTracksAvailable = debateAvailable && psAvailable;

  // Resolve initial track/mode from the URL once, on first render — mirrors
  // v1. This is what lets us avoid a mount-time router.replace: if the URL
  // already matches, there's nothing to sync.
  const urlTrack = searchParams.get("track")?.toUpperCase();
  const resolvedInitialTrack: Track =
    urlTrack === "DEBATE" && debateAvailable
      ? "DEBATE"
      : urlTrack === "PS" && psAvailable
        ? "PS"
        : initialTrack;

  const urlMode = searchParams.get("mode")?.toUpperCase();
  const resolvedInitialMode: Mode =
    urlMode === "ADJUDICATOR" || urlMode === "PARTICIPANT" || urlMode === "INDIVIDUAL"
      ? (urlMode as Mode)
      : initialMode;

  const [track, setTrack] = useState<Track>(resolvedInitialTrack);
  const [mode, setMode] = useState<Mode>(resolvedInitialMode);

  // Only called from user-triggered handlers below — never from an effect —
  // so there's no redundant replace on mount and no extra render cycle.
  const updateUrlParams = (nextTrack: Track, nextMode: Mode) => {
    const params = new URLSearchParams(window.location.search);
    params.set("track", nextTrack.toLowerCase());
    params.set("mode", nextMode.toLowerCase());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleTrackChange = (nextTrack: Track) => {
    setTrack(nextTrack);
    setMode("PARTICIPANT");
    updateUrlParams(nextTrack, "PARTICIPANT");
  };

  const handleModeChange = (nextMode: Mode) => {
    setMode(nextMode);
    updateUrlParams(track, nextMode);
  };

  // --- Action Hooks (unconditional — required by Rules of Hooks) ---
  const [teamState, teamAction, teamPending] = useActionState(
    registerTeamAction.bind(null, tournamentId),
    initialState,
  );
  const [individualState, individualAction, individualPending] = useActionState(
    registerIndividualAction.bind(null, tournamentId),
    initialState,
  );
  const [adjudicatorState, adjudicatorAction, adjudicatorPending] = useActionState(
    registerAdjudicatorAction.bind(null, tournamentId),
    initialState,
  );
  const [psState, psAction, psPending] = useActionState(
    registerPSAction.bind(null, tournamentId),
    initialState,
  );
  const [psAdjudicatorState, psAdjudicatorAction, psAdjudicatorPending] = useActionState(
    registerPSAdjudicatorAction.bind(null, tournamentId),
    initialState,
  );
  const targetKey = `${track}.${mode}`.toUpperCase();

  const formPropsMap: Record<string, BaseFormProps> = useMemo(
    () => ({
      "DEBATE.PARTICIPANT": { state: teamState, action: teamAction, isPending: teamPending, event },
      "DEBATE.INDIVIDUAL": { state: individualState, action: individualAction, isPending: individualPending, event },
      "DEBATE.ADJUDICATOR": { state: adjudicatorState, action: adjudicatorAction, isPending: adjudicatorPending, event },
      "PS.PARTICIPANT": { state: psState, action: psAction, isPending: psPending, event },
      "PS.ADJUDICATOR": { state: psAdjudicatorState, action: psAdjudicatorAction, isPending: psAdjudicatorPending, event },
    }),
    [
      teamState, teamAction, teamPending,
      individualState, individualAction, individualPending,
      adjudicatorState, adjudicatorAction, adjudicatorPending,
      psState, psAction, psPending,
      psAdjudicatorState, psAdjudicatorAction, psAdjudicatorPending,
      event,
    ],
  );

  const ActiveForm = FORM_REGISTRY[targetKey];
  const activeProps = formPropsMap[targetKey];
  const isSuccess = activeProps?.state.success === true;

  // Same "which follow-up link matches this mode" logic as v1, ported over
  // since the success screen needs it regardless of which form is active.
  const foundLink = useMemo(() => {
    const key = `${track}.${mode}`.toLowerCase();
    return event.links?.find((item) => item.label.toLowerCase() === key);
  }, [event.links, track, mode]);

  const showAdjudicatorToggle = true
    // (track === "PS" && event.psAdjudicatorsAllowed) ||
    // (track === "DEBATE" &&
    //   event.registrationType === "TEAM" &&
    //   (event.adjudicatorPolicy === "N_PLUS_ONE" || event.adjudicatorPolicy === "FIXED"));

  return (
    <div className="w-full text-text-primary min-h-screen p-6 gap-3 flex flex-col">
      <header className="w-full pt-4 flex items-center justify-between">
        <Link
          href={`/events/${eventId}`}
          className="group inline-flex items-center gap-1.5 font-manrope text-sm! font-bold tracking-tighter text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>
      </header>

      <div className="flex gap-3   w-full flex-col items-stretch md:gap-10">
        {/* Left Side: Tournament Metadata + Controls */}
        <div className="w-full space-y-6 flex flex-col gap-5">
          <div className="rounded-xs text-left">
            <h2 className="font-playfair! text-3xl! font-semibold text-text-primary tracking-normal leading-relaxed">
              {event.title}
            </h2>
          </div>

          <div className="space-y-8 flex flex-col gap-7 border-b border-border pb-4">
            {bothTracksAvailable && (
              <div className="space-y-2 flex flex-col gap-3">
                <label className="block text-xs font-bold font-ui uppercase tracking-widest text-text-muted">
                  Registration Type
                </label>
                <div className="flex bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28]/10 p-0.5 rounded-xs w-full max-w-sm">
                  {(["DEBATE", "PS"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTrackChange(t)}
                      className={`flex-1 px-4 py-2.5 text-xs rounded-xs font-bold transition-all ${
                        track === t
                          ? "bg-[#2e3a28] text-white"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {t === "DEBATE" ? "Debate" : "Public Speaking"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showAdjudicatorToggle && (
              <div className="space-y-2 flex flex-col gap-3">
                <label className="block text-xs font-bold font-ui uppercase tracking-widest text-text-muted">
                  Registering As
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
                  {(["PARTICIPANT", "ADJUDICATOR", "INDIVIDUAL"] as const).map((m) => {
                    if (track === "PS" && m === "INDIVIDUAL") return null;
                    const active = mode === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleModeChange(m)}
                        className={`flex items-center gap-3 p-4 border rounded-xs text-left transition-all ${
                          active
                            ? "border-[#2e3a28] bg-[#2e3a28]/5"
                            : "border-[#2e3a28]/10 hover:border-[#2e3a28]/30"
                        }`}
                      >
                        <div className={active ? "text-[#2e3a28]" : "text-text-muted"}>
                          {m === "PARTICIPANT" && track === "DEBATE" ? (
                            <Users size={20} />
                          ) : m === "ADJUDICATOR" ? (
                            <Gavel size={20} />
                          ) : (
                            <User size={20} />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-sm">
                            {m === "PARTICIPANT"
                              ? "Participant"
                              : m === "INDIVIDUAL"
                                ? "Individual"
                                : "Independent Adjudicator"}
                          </div>
                          <div className="text-[9px] text-text-muted">
                            Register as a{" "}
                            {m === "PARTICIPANT"
                              ? "speaker"
                              : m === "INDIVIDUAL"
                                ? "individual"
                                : "adjudicator"}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Registry Output */}
        <div className="w-full md:w-2/3 flex flex-col gap-3 rounded-xs overflow-hidden">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#2e3a28]/10 text-primary flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-garamond text-xl font-bold tracking-wide">
                  Registration Successful
                </h4>
                <p className="font-garamond text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                  Keep in touch with the tournament organizers for updates and
                  next steps.
                </p>
                <a
                  href={foundLink?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary font-bold text-sm underline mt-4 block"
                >
                  Join the {mode.toLowerCase()} Group
                </a>
              </div>
            </motion.div>
          ) : ActiveForm && activeProps ? (
            <ActiveForm {...activeProps} />
          ) : (
            <p className="text-sm text-text-muted">
              Select a registration option to begin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}