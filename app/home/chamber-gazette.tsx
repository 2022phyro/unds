import Link from "next/link";
import { Button } from "@/components/ui/bookmark-button/button";
import { db } from "@/lib/db";
import { toUpcomingEvent } from "@/lib/view-models/events";

export async function ChamberGazette() {
  const tournaments = await db.tournamentConfig.findMany({
    orderBy: { sortDate: "asc" },
    take: 3,
  });
  const events = tournaments.map(toUpcomingEvent);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-none sm:rounded-xl border border-border bg-surface-muted/30 shadow-md lg:grid-cols-12">
      {/* Left Side: Thinner Calendar Agenda (5 Columns out of 12) */}
      <div className="p-6 lg:col-span-5 border-b border-border lg:border-b-0 lg:border-r lg:p-8 flex flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center justify-end h-10   border-b border-border/60">
            <Link
              href="/events"
              className="text-[11px] font-bold uppercase self-end h-full inline-flex items-center border-border border p-2  tracking-wider text-accent transition-colors hover:text-text-primary"
            >
              Full Calendar →
            </Link>
          </div>

          {/* Clean, high-contrast accessible list */}
          <div className="divide-y divide-border/40">
            {events.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="group block"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4 py-3.5 px-2 rounded-lg transition-colors hover:bg-surface-muted/30">
                  <span className="text-sm font-playfair tracking-wide text-text-secondary sm:min-w-17.5 shrink-0">
                    {event.date}
                  </span>

                  <div className="flex flex-1 min-w-0 items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="m-0 truncate font-garamond text-lg font-medium leading-snug text-text-primary">
                        {event.title}
                      </p>
                      {event.time && (
                        <span className="mt-0.5 block text-[11px] text-text-muted">
                          {event.time}
                        </span>
                      )}
                    </div>

                    <span className="hidden shrink-0 translate-x-1 text-[10px] font-mono font-bold uppercase tracking-wider text-accent opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-flex">
                      See More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Next round locks in 6 days.
          </div>
        </div>
      </div>

      {/* Right Side: Wider Mission Layer with Attributed Blockquote (7 Columns out of 12) */}
      <div className="flex flex-col justify-evenly bg-surface-muted/40 p-6 lg:col-span-7 lg:p-10 gap-8">
        <div className="space-y-4">
          <blockquote className="border-l-2 border-accent pl-4 m-0 space-y-2">
            <p className="font-heading text-xl font-semibold leading-relaxed text-text-primary sm:text-2xl m-0">
              "Debating is a reading sport before it's a speaking sport."
            </p>
            <cite className="block text-xs font-mono not-italic text-text-muted">
              — Raymond, ANUDC Champion '25
            </cite>
          </blockquote>
        </div>

        <div className="flex flex-col gap-3 items-start">
          <p className="mb-4 text-sm leading-relaxed text-text-secondary max-w-xl m-0">
            In a world where people have so much to say, we bring you a platform
            that ensures you get to say it
          </p>
          <div>
            <Button href="https://chat.whatsapp.com/LvI1vW1kB0f9L2EB3JgJ87?s=cl&p=a&ilr=1&amv=2" className="font-garamond">
              Register Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
