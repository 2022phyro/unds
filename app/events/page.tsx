import { db } from "@/lib/db";
import { toRegistryEvent } from "@/lib/view-models/events";
import EventsRegistryClient from "./events-registry-client";

// Cache the rendered listing for 5 minutes — shorter than the individual
// event page's window since this page shows "upcoming" status/countdowns
// across many events at once and is more likely to need to reflect recent
// changes (a new event added, one filling up). Tune to taste.
export const revalidate = 86400;

export default async function EventsRegistryPage() {
  const tournaments = await db.tournamentConfig.findMany({ orderBy: { sortDate: "asc" } });
  const events = tournaments.map(toRegistryEvent);

  return <EventsRegistryClient events={events} />;
}