import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { toRegisterEvent } from "@/lib/view-models/events";
import RegisterFormClient from "./register-form-client";

interface RegisterPageProps {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ track?: string; mode?: string }>;
}

export default async function EventRegistrationPage({ params, searchParams }: RegisterPageProps) {
  const { eventId } = await params;
  const { track, mode } = await searchParams;

  const tournament = await db.tournamentConfig.findUnique({ where: { slug: eventId } });
  if (!tournament) notFound();
  if (tournament.registrationType === "NONE" && !tournament.includesPS) {
    redirect(`/events/${eventId}`);
  }

  const event = toRegisterEvent(tournament);
  const initialTrack = track === "ps" && event.includesPS ? "PS" : "DEBATE";
  const initialMode = mode === "adjudicator" ? "ADJUDICATOR" : "PARTICIPANT";

  return (
    <RegisterFormClient
      tournamentId={tournament.id}
      eventId={eventId}
      event={event}
      initialTrack={initialTrack}
      initialMode={initialMode}
    />
  );
}
