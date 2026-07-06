import Link from "next/link";
import { UPCOMING_EVENTS } from "./home-data";
import { Button } from "@/components/ui/bookmark-button/button";

export function ChamberGazette() {
  return (
      <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-surface-muted/30 shadow-md lg:grid-cols-12">
        
        {/* Left Side: Thinner Calendar Agenda (5 Columns out of 12) */}
        <div className="p-6 lg:col-span-5 border-b border-border lg:border-b-0 lg:border-r lg:p-8">
          <div className="mb-6 flex items-center justify-between pb-2 border-b border-border/60">
            <h3 className="text-xl font-bold tracking-tight text-text-primary">
              Gazette
            </h3>
            <Link
              href="/events"
              className="text-[11px] font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary"
            >
              Full Calendar →
            </Link>
          </div>

          {/* Clean, high-contrast accessible list */}
          <div className="divide-y divide-border/40">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.title}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 py-3.5 px-1 transition-colors hover:bg-surface-muted/20"
              >
                {/* Fixed structural timestamp column */}
                <span className="text-xs font-bold tracking-wide text-text-secondary min-w-[70px] shrink-0">
                  {event.date}
                </span>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium leading-snug text-text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    {event.title}
                  </h4>
                  <span className="mt-0.5 block text-[11px] text-text-muted">
                    {event.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-4 text-[11px] text-text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-text-secondary" />
            Next debate round locks in 6 days.
          </div>
        </div>

        {/* Right Side: Wider Mission Layer with High-Contrast Text (7 Columns out of 12) */}
        <div className="flex flex-col justify-evenly bg-surface-muted/40 p-6 lg:col-span-7 lg:p-10">
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
              Institutional Creed
            </span>
            <p className="font-heading text-xl font-semibold italic leading-relaxed text-text-primary sm:text-2xl">
              "Eloquence without strict structural logic is merely a
              dangerous ornament. We command both."
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 items-start">
            <p className="mb-5 text-sm leading-relaxed text-text-secondary max-w-xl">
              The University of Nigeria Debating Society functions as an
              active intellectual laboratory. Membership is contingent upon
              critical rigor.
            </p>
            <Button>
                Submit Credentials
            </Button>
          </div>
        </div>
        

      </div>
  );
}