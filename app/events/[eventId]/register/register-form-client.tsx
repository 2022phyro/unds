"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
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
  const debateAvailable = event.registrationType !== "NONE";
  const psAvailable = event.includesPS;
  const bothTracksAvailable = debateAvailable && psAvailable;

  const [track, setTrack] = useState<"DEBATE" | "PS">(
    initialTrack === "PS" && psAvailable
      ? "PS"
      : debateAvailable
        ? "DEBATE"
        : "PS",
  );
  const [mode, setMode] = useState<"PARTICIPANT" | "ADJUDICATOR">(initialMode);

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
    track === "PS"
      ? event.psAdjudicatorsAllowed
      : event.adjudicatorPolicy !== "NONE";

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

  function selectTrack(next: "DEBATE" | "PS") {
    setTrack(next);
    setMode("PARTICIPANT");
  }

  return (
    <div className="w-full  text-text-primary min-h-screen flex flex-col">
      <header className="w-full px-6 py-4 border-b border-[#2e3a28]/10 flex items-center justify-between shadow-2xs">
        <Link
          href={`/events/${eventId}`}
          className="group inline-flex items-center gap-1.5 font-manrope text-xs text-sm tracking-widest text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Cancel & Return to Details
        </Link>
        <span className="font-manrope text-[9px] text-sm tracking-widest text-text-muted bg-[color-mix(in_srgb,var(--surface)_95%,black)]  px-2.5 py-1 border border-[#2e3a28]/10 rounded-xs">
          Terminal ID // {eventId}
        </span>
      </header>

      <div className="flex-1 max-w-6xl w-full md:flex md:flex-col items-stretch md:gap-10 mx-auto p-4 sm:p-8 lg:p-12 lg:grid grid-cols-1 lg:grid-cols-12 lg:gap-5 lg:items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)] p-6 rounded-xs space-y-4 shadow-3xs text-left">
            <div>
              <h2 className="font-playfair text-4xl! font-bold text-text-primary tracking-tight leading-relaxed">
                {event.title}
              </h2>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#2e3a28]/5 font-manrope text-xs text-text-secondary flex flex-col gap-2">
              <div className="flex flex-col justify-center items-start">
                <span className="text-text-muted font-manrope text-xs">
                  Format:
                </span>
                <span className="font-bold text-text-primary text-sm">
                  {event.format}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="text-text-muted font-manrope text-xs">
                  Venue:
                </span>
                <span className="font-bold text-text-primary text-sm">
                  {event.location}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="text-text-muted font-manrope text-xs">
                  Timeline:
                </span>
                <span className="font-bold text-text-primary text-sm">
                  {event.date}
                </span>
              </div>
            </div>
          </div>

          {bothTracksAvailable && (
            <div className="flex bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28]/10 p-0.5 text-xs font-manrope rounded-xs">
              <button
                type="button"
                onClick={() => selectTrack("DEBATE")}
                className={`flex-1 px-2.5 py-1.5 transition-all cursor-pointer ${track === "DEBATE" ? "bg-[#2e3a28] text-white font-bold" : "text-text-muted"}`}
              >
                Debate
              </button>
              <button
                type="button"
                onClick={() => selectTrack("PS")}
                className={`flex-1 px-2.5 py-1.5 transition-all cursor-pointer ${track === "PS" ? "bg-[#2e3a28] text-white font-bold" : "text-text-muted"}`}
              >
                Public Speaking
              </button>
            </div>
          )}

          <div className="font-manrope text-xs text-text-muted leading-relaxed space-y-2 p-2">
            <div className="flex gap-2 items-start text-primary">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                Take a moment to double-check your details before submitting.
                We'll use the information you provide for registrations,
                certificates, and event communication.
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  border border-[#2e3a28] rounded-xs shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#2e3a28]/10 bg-[color-mix(in_srgb,var(--surface)_95%,black)] text-left flex items-center justify-between gap-4">
            <h3 className="font-manrope  text-sm tracking-wider text-primary">
              {mode === "ADJUDICATOR"
                ? track === "PS"
                  ? "Public Speaking Adjudicator"
                  : "Independent Adjudicator"
                : track === "PS"
                  ? "Public Speaking Signup"
                  : event.registrationType === "TEAM"
                    ? "Team Signup"
                    : "Individual Signup"}
            </h3>
            {showAdjudicatorToggle && (
              <div className="flex bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28]/10 p-0.5 text-xs   font-manrope rounded-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setMode("PARTICIPANT")}
                  className={`px-2.5 py-1 transition-all cursor-pointer ${mode === "PARTICIPANT" ? "bg-[#2e3a28] text-white font-bold" : "text-text-muted"}`}
                >
                  Participant
                </button>
                <button
                  type="button"
                  onClick={() => setMode("ADJUDICATOR")}
                  className={`px-2.5 py-1 transition-all cursor-pointer ${mode === "ADJUDICATOR" ? "bg-[#2e3a28] text-white font-bold" : "text-text-muted"}`}
                >
                  Adjudicator
                </button>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 text-left">
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
                    You're Registered!
                  </h4>

                  <p className="font-garamond text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                    Thank you for registering. We've received your details, and
                    a confirmation email is on its way. We look forward to
                    welcoming you at the event.
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href="/events"
                    className="px-5 py-2.5 border border-[#2e3a28] font-manrope text-sm tracking-wider font-bold hover:bg-[#2e3a28] hover:text-white transition-all"
                  >
                    Explore More Events
                  </Link>
                </div>
              </motion.div>
            ) : track === "PS" ? (
              mode === "ADJUDICATOR" ? (
                <form action={psAdjudicatorAction} className="space-y-6">
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
                  {psAdjudicatorState.error && (
                    <p className="text-xs font-manrope text-red-700">
                      {psAdjudicatorState.error}
                    </p>
                  )}
                  <SubmitRow isPending={psAdjudicatorPending} />
                </form>
              ) : (
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
                    label="Institution / Chapter/ Faculty"
                    name="institution"
                    placeholder="e.g., University of Nigeria, Nsukka"
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
              <form action={adjudicatorAction} className="space-y-6">
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
                {adjudicatorState.error && (
                  <p className="text-xs font-manrope text-red-700">
                    {adjudicatorState.error}
                  </p>
                )}
                <SubmitRow isPending={adjudicatorPending} />
              </form>
            ) : event.registrationType === "TEAM" ? (
              <form action={teamAction} className="space-y-6">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Institution / Chapter / Faculty"
                      name="institution"
                      placeholder="e.g., University of Nigeria, Nsukka"
                    />
                    <Field
                      label="Team Name"
                      name="teamName"
                      placeholder="e.g., UNN Alpha"
                    />
                  </div>
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
                </div>
                {teamState.error && (
                  <p className="text-xs font-manrope text-red-700">
                    {teamState.error}
                  </p>
                )}
                <SubmitRow isPending={teamPending} />
              </form>
            ) : (
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
    <div className="space-y-1.5">
      <label className="block font-manrope font-bold text-sm tracking-wider text-text-secondary">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-xs border border-gray-700 bg-[color-mix(in_srgb,var(--surface)_90%,black)]  px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] font-manrope transition-colors"
      />
    </div>
  );
}

function SubmitRow({ isPending }: { isPending: boolean }) {
  return (
    <div className="pt-4 border-t border-[#2e3a28]/10 flex items-center justify-between">
      <span className="font-manrope text-xs text-text-muted hidden sm:block">
        Takes approximately 3 minutes to log.
      </span>
      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto rounded-xs bg-[#2e3a28] text-foreground px-6 py-3 font-manrope text-sm tracking-widest font-black shadow-xs hover:bg-[#1f281b] transition-colors disabled:opacity-40 cursor-pointer"
      >
        {isPending ? "Submitting..." : "Register"}
      </button>
    </div>
  );
}
