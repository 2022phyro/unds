import { db } from "@/lib/db";
import { toRegistryEvent } from "@/lib/view-models/events";
import EventsRegistryClient from "./events-registry-client";

export default async function EventsRegistryPage() {
  const tournaments = await db.tournamentConfig.findMany({ orderBy: { sortDate: "asc" } });
  const events = tournaments.map(toRegistryEvent);

  return <EventsRegistryClient events={events} />;
}
