"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Info, User, Gavel } from "lucide-react";
import {
  registerTeamAction,
  registerIndividualAction,
  registerAdjudicatorAction,
  registerPSAction,
  registerPSAdjudicatorAction,
  type ActionState,
} from "@/lib/actions/tournaments";
import type { RegisterEventView } from "@/lib/view-models/events";

interface RegisterFormClientProps {
  tournamentId: string;
  eventId: string;
  event: RegisterEventView;
  initialTrack: "DEBATE" | "PS";
  initialMode: "PARTICIPANT" | "ADJUDICATOR";
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

  // Resolve Track from URL query params or Fallback properties
  const urlTrack = searchParams.get("track")?.toUpperCase();
  const resolvedInitialTrack =
    urlTrack === "DEBATE" && debateAvailable
      ? "DEBATE"
      : urlTrack === "PS" && psAvailable
        ? "PS"
        : initialTrack;

  // Resolve Mode from URL query params or Fallback properties
  const urlMode = searchParams.get("mode")?.toUpperCase();
  const resolvedInitialMode =
    urlMode === "ADJUDICATOR" || urlMode === "PARTICIPANT"
      ? (urlMode as "PARTICIPANT" | "ADJUDICATOR")
      : initialMode;

  const [track, setTrack] = useState<"DEBATE" | "PS">(resolvedInitialTrack);
  const [mode, setMode] = useState<"PARTICIPANT" | "ADJUDICATOR">(
    resolvedInitialMode,
  );

  // Helper to update URL params cleanly on interaction without triggering re-render loops
  const updateUrlParams = (
    newTrack: "DEBATE" | "PS",
    newMode: "PARTICIPANT" | "ADJUDICATOR",
  ) => {
    const params = new URLSearchParams(window.location.search);
    params.set("track", newTrack.toLowerCase());
    params.set("mode", newMode.toLowerCase());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleTrackChange = (nextTrack: "DEBATE" | "PS") => {
    setTrack(nextTrack);
    setMode("PARTICIPANT");
    updateUrlParams(nextTrack, "PARTICIPANT");
  };

  const handleModeChange = (nextMode: "PARTICIPANT" | "ADJUDICATOR") => {
    setMode(nextMode);
    updateUrlParams(track, nextMode);
  };

  // Form State Actions Hooks
  const [teamState, teamAction, teamPending] = useActionState(
    registerTeamAction.bind(null, tournamentId),
    initialState,
  );
  const [individualState, individualAction, individualPending] = useActionState(
    registerIndividualAction.bind(null, tournamentId),
    initialState,
  );
  const [adjudicatorState, adjudicatorAction, adjudicatorPending] =
    useActionState(
      registerAdjudicatorAction.bind(null, tournamentId),
      initialState,
    );
  const [psState, psAction, psPending] = useActionState(
    registerPSAction.bind(null, tournamentId),
    initialState,
  );
  const [psAdjudicatorState, psAdjudicatorAction, psAdjudicatorPending] =
    useActionState(
      registerPSAdjudicatorAction.bind(null, tournamentId),
      initialState,
    );

  const showAdjudicatorToggle =
    (track === "PS" && event.psAdjudicatorsAllowed) ||
    (track === "DEBATE" &&
      event.registrationType === "TEAM" &&
      (event.adjudicatorPolicy === "N_PLUS_ONE" ||
        event.adjudicatorPolicy === "FIXED"));

  const activeState =
    track === "PS"
      ? mode === "ADJUDICATOR"
        ? psAdjudicatorState
        : psState
      : mode === "ADJUDICATOR"
        ? adjudicatorState
        : event.registrationType === "TEAM"
          ? teamState
          : individualState;
  const isSuccess = activeState.success === true;

  // Rule: N+1 or FIXED policies require team-associated adjudicators
  const requiresInstitutionalAdjudicator =
    track === "DEBATE" &&
    event.registrationType === "TEAM" &&
    (event.adjudicatorPolicy === "N_PLUS_ONE" ||
      event.adjudicatorPolicy === "FIXED");

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

      <div className="flex gap-3 max-w-6xl w-full flex-col md:px-4 items-stretch md:gap-10">
        {/* Left Side: Tournament Metadata */}
        <div className="lg:col-span-4 space-y-6 flex flex-col gap-5">
          <div className=" rounded-xs space-y4  text-left">
            <div>
              <h2 className="font-playfair! text-3xl! font-semibold text-text-primary tracking-normal leading-relaxed">
                {event.title}
              </h2>
            </div>
          </div>
          {/* ─── DYNAMIC REGISTRATION SELECTION ────────────────────────── */}
          <div className="space-y-8 flex flex-col gap-7 border-b border-border pb-4">
            {/* Registration Type Toggle: Only show if both are available */}
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

            {/* Registering As Toggle: Only show if that track allows both modes */}
            <div className="space-y-2 flex flex-col gap-3">
              <label className="block text-xs font-bold font-ui uppercase tracking-widest text-text-muted">
                Registering As
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm">
                {(["PARTICIPANT", "ADJUDICATOR"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleModeChange(m)}
                    className={`flex items-center gap-3 p-4 border rounded-xs text-left transition-all ${
                      mode === m
                        ? "border-[#2e3a28] bg-[#2e3a28]/5"
                        : "border-[#2e3a28]/10 hover:border-[#2e3a28]/30"
                    }`}
                  >
                    {/* Icons based on your design */}
                    <div
                      className={
                        mode === m ? "text-[#2e3a28]" : "text-text-muted"
                      }
                    >
                      {m === "PARTICIPANT" ? (
                        <User size={20} />
                      ) : (
                        <Gavel size={20} />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm">
                        {m === "PARTICIPANT"
                          ? "Participant"
                          : "Independent Adjudicator"}
                      </div>
                      <div className="text-[9px] text-text-muted">
                        Register as a{" "}
                        {m === "PARTICIPANT" ? "speaker" : "adjudicator"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Form Layout */}
        <div className="lg:col-span-8 flex flex-col gap-3 w-full max-w-sm  rounded-xs overflow-hidden">
          <div className="text-left">
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
                    Keep in touch with the tournament organizers for updates and next steps.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/L4kqJU1XBluKQiVJnyokyr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary font-bold text-sm underline"
                  >
                    Join Whatsapp Group
                  </a>
                </div>
                <div className="pt-4">
                  <Link
                    href="/events"
                    className="px-5 py-2.5 border border-[#2e3a28] font-manrope text-sm tracking-wider font-bold hover:bg-[#2e3a28] hover:text-white! transition-all"
                  >
                    Explore More Events
                  </Link>
                </div>
              </motion.div>
            ) : track === "PS" ? (
              mode === "ADJUDICATOR" ? (
                /* Public Speaking Adjudicator Form */
                <form
                  action={psAdjudicatorAction}
                  className="flex flex-col gap-4 space-y-6"
                >
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
                    label="Institution / Chapter / Faculty"
                    name="institution"
                    placeholder="e.g. Civil Engineering/Engineering"
                  />
                  {psAdjudicatorState.error && (
                    <p className="text-xs font-manrope text-red-700">
                      {psAdjudicatorState.error}
                    </p>
                  )}
                  <SubmitRow isPending={psAdjudicatorPending} />
                </form>
              ) : (
                /* Public Speaking Participant Form */
                <form
                  action={psAction}
                  className="space-y-6 flex flex-col gap-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Full Legal Name"
                      name="name"
                      placeholder="Your First & Last Name"
                    />
                    <Field
                      label="Contact Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </div>
                  <Field
                    label="Institution / Chapter / Faculty"
                    name="institution"
                    placeholder="e.g. Civil Engineering/Engineering"
                  />
                  {psState.error && (
                    <p className="text-xs font-manrope text-red-700">
                      {psState.error}
                    </p>
                  )}
                  <SubmitRow isPending={psPending} />
                </form>
              )
            ) : mode === "ADJUDICATOR" ? (
              /* Independent Debate Adjudicator Form (IA) */
              <form
                action={adjudicatorAction}
                className="flex flex-col gap-4 space-y-6"
              >
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
                  label="Institution / Chapter / Faculty"
                  name="institution"
                  placeholder="e.g. Civil Engineering/Engineering"
                />
                {adjudicatorState.error && (
                  <p className="text-xs font-manrope text-red-700">
                    {adjudicatorState.error}
                  </p>
                )}
                <SubmitRow isPending={adjudicatorPending} />
              </form>
            ) : event.registrationType === "TEAM" ? (
              /* Team Registration Form (Plus Optional N+1/Fixed Institutional Adj) */
              <form action={teamAction} className="space-y-6 w-full">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Institution / Chapter / Faculty"
                      name="institution"
                      placeholder="e.g. Civil Engineering/Engineering"
                    />
                    <Field
                      label="Team Name"
                      name="teamName"
                      placeholder="e.g., UNN Alpha"
                    />
                  </div>

                  {/* Speaker 1 Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#2e3a28]/5 pt-4">
                    <Field
                      label="Speaker 1 Name"
                      name="player1Name"
                      placeholder="Full Name"
                    />
                    <Field
                      label="Speaker 1 Email"
                      name="player1Email"
                      type="email"
                      placeholder="speaker1@example.com"
                    />
                  </div>

                  {/* Speaker 2 Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#2e3a28]/5 pt-4">
                    <Field
                      label="Speaker 2 Name"
                      name="player2Name"
                      placeholder="Full Name"
                    />
                    <Field
                      label="Speaker 2 Email"
                      name="player2Email"
                      type="email"
                      placeholder="speaker2@example.com"
                    />
                  </div>

                  {/* Institutional Adjudicator Dynamic Section */}
                  {requiresInstitutionalAdjudicator && (
                    <div className="border-t border-[#2e3a28]/10 pt-5 mt-5 space-y-4">
                      <div className="flex items-start gap-2 text-xs text-text-muted bg-[color-mix(in_srgb,var(--surface)_90%,black)] p-3 rounded-xs border border-[#2e3a28]/10">
                        <Info className="w-4 h-4 shrink-0 text-primary" />
                        <div>
                          <strong className="text-text-primary">
                            Institutional Adjudicator Required:
                          </strong>{" "}
                          This tournament enforces an{" "}
                          <strong>
                            {event.adjudicatorPolicy?.replace("_", " ")}
                          </strong>{" "}
                          policy. Your team's registration must register an
                          associated institutional adjudicator below.
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
                </div>
                {teamState.error && (
                  <p className="text-xs font-manrope text-red-700">
                    {teamState.error}
                  </p>
                )}
                <SubmitRow isPending={teamPending} />
              </form>
            ) : (
              /* Individual Debate Participant Form */
              <form action={individualAction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Legal Name"
                    name="name"
                    placeholder="Your First & Last Name"
                  />
                  <Field
                    label="Contact Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                {individualState.error && (
                  <p className="text-xs font-manrope text-red-700">
                    {individualState.error}
                  </p>
                )}
                <SubmitRow isPending={individualPending} />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5 flex flex-col gap-1">
      <label className="block font-manrope text-sm text-text-secondary">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-xs border border-gray-700  px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] font-manrope transition-colors"
      />
    </div>
  );
}

function SubmitRow({ isPending }: { isPending: boolean }) {
  return (
    <div className="pt-4 border-t border-[#2e3a28]/10 flex items-center w-full justify-between">
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xs btn btn-primary px-6 py-3 h-12 font-manrope text-sm! tracking-widest font-black shadow-xs hover:bg-[#1f281b] transition-colors disabled:opacity-40 cursor-pointer"
      >
        {isPending ? "Submitting..." : "Register"}
      </button>
    </div>
  );
}
