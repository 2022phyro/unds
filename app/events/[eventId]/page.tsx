import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/bookmark-button";
import { db } from "@/lib/db";
import { toEventDetail } from "@/lib/view-models/events";

interface EventDetailsPageProps {
  params: Promise<{ eventId: string }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { eventId } = await params;

  const tournament = await db.tournamentConfig.findUnique({
    where: { slug: eventId },
  });
  if (!tournament) notFound();

  const event = toEventDetail(tournament);

  return (
    <div className="w-full text-text-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-start justify-start gap-3 sm:px-6 lg:px-8 space-y-16">
        {/* ─── BREADCRUMB ──────────────────────────────────────────────── */}
        <div className="pt-2">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 font-ui text-[11px]  tracking-wider text-text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Registry Ledger
          </Link>
        </div>

        {/* ─── HERO HEADER BLOCK ───────────────────────────────────────── */}
        <div className="space-y-6 border-b flex flex-col gap-3 border-[#2e3a28]/10 pb-10">
          <div className="space-y-2">
            <span className="inline-block text-[10px] font-ui  tracking-[0.2em] bg-[#2e3a28]/5 border border-[#2e3a28]/15 text-primary px-2.5 py-0.5 rounded-xs font-bold">
              {event.format}
            </span>
            <h1 className="font-playfdair text-3xl! sm:text-5xl font-black tracking-tight text-text-primary leading-tight">
              {event.title}
            </h1>
          </div>

          <div className="border-t grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 font-manrope text-xs text-text-secondary">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block font-ui text-[9px] text-text-muted  tracking-wider">
                  Chronology
                </span>
                <span className="font-bold text-text-primary">
                  {event.date}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block font-ui text-[9px] text-text-muted  tracking-wider">
                  Venue Desk
                </span>
                <span className="font-bold text-text-primary  tracking-wide">
                  {event.location}
                </span>
              </div>
            </div>
            {event.deadlineText && (
              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block font-ui text-[9px] text-text-muted  tracking-wider">
                    Registration Clock
                  </span>
                  <span className="font-bold text-red-700">
                    {event.deadlineText}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── DYNAMIC REGISTRATION CALLOUT CONTROLLER ──────────────────── */}
        <div className="w-full max-w-4xl">
          <div className="bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28] w-full flex flex-col sm:flex-row justify-start items-center p-6 gap-6">
            <div className="space-y-1 flex flex-col gap-2">
              <h3 className="font-garamond text-xl font-bold text-text-primary">
                {event.registration_type === "NONE" && "Everyone's Welcome"}
                {event.registration_type === "INDIVIDUAL" &&
                  "Individual Registration"}
                {event.registration_type === "TEAM" && "Registration"}
                {event.registration_type === "INDIVIDUAL" &&
                  event.includesPS &&
                  "Public Speaking Registration"}
              </h3>

              <p className="font-garamond text-sm text-text-secondary max-w-xl leading-relaxed">
                {event.registration_type === "NONE" &&
                  "This event is open to everyone. No registration is required—just come along with your curiosity, a notebook if you'd like, and be ready to take part."}

                {event.registration_type === "INDIVIDUAL" &&
                  "Register as an individual to reserve your place. The process only takes a couple of minutes, and we'll send you everything you need before the event."}

                {event.registration_type === "TEAM" &&
                  "Register your team together. You'll be asked to provide your team members' details so we can prepare the tournament draw and event schedule."}

                {event.includesPS &&
                  event.registration_type !== "NONE" &&
                  " If you're interested in the Public Speaking category, you'll need to complete a separate registration for that event as well."}

                {event.registration_type === "INDIVIDUAL" &&
                  event.includesPS &&
                  "The Public Speaking event requires a quick individual registration so we can organise speaking slots and keep you updated with event information."}
              </p>
            </div>

            <div className="flex flex-col  w-full sm:w-auto justify-evenly items-stretch flex-wrap gap-3">
              {event.registration_type === "NONE" && !event.includesPS ? (
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
                <>
                  {event.registration_type !== "NONE" && (
                    <Button
                      href={
                        event.includesPS
                          ? `/events/${eventId}/register?track=debate`
                          : `/events/${eventId}/register`
                      }
                      className="font-manrope h-12  w-full sm:w-60 capitalize font-medium "
                      aria-label="Register for Debate"
                    >
                      {event.registration_type === "TEAM"
                        ? "Register Your Team"
                        : "Secure spot"}
                    </Button>
                  )}
                  {event.registration_type !== "NONE" && event.includesPS && (
                    <Button
                      href={`/events/${eventId}/register?track=ps`}
                      className="font-manrope w-full h-12 sm:w-60 capitalize font-medium"
                      aria-label="Register for Public Speaking"
                    >
                      Register — Public Speaking
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* ─── CORE BRIEFING / ABOUT ───────────────────────────────────── */}
        <div className="space-y-3 flex flex-col gap-3">
          <h2 className="font-garamond text-3xl! font-bold text-primary  tracking-widest">
            The Objective
          </h2>
          <p className="font-garamond text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
            {event.description}
          </p>
        </div>

        {/* ─── WHO SHOULD ATTEND ────────────────────────────────────────── */}
        <div className="space-y-4 border-t flex flex-col gap-3 border-[#2e3a28]/10 pt-10">
          <h2 className="font-garamond text-3xl! font-bold text-primary  tracking-widest">
            Eligibility & Intended Audience
          </h2>
          <ul className="space-y-2 font-garamond text-base text-text-secondary">
            {event.whoShouldAttend.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── TRACK TIMELINE / SCHEDULE ────────────────────────────────── */}
        <div className="space-y-6 border-t flex flex-col gap-3 border-[#2e3a28]/10 pt-10">
          <h2 className="font-garamond text-3xl! font-bold text-primary  tracking-widest">
            Schedule & Event Timeline
          </h2>
          <div className="space-y-4">
            {event.schedule.map((slot, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-b border-[#2e3a28]/5 pb-4 last:border-0"
              >
                <div className="md:col-span-4 font-ui text-sm font-bold text-primary  tracking-wider">
                  {slot.time}
                </div>
                <div className="md:col-span-8 space-y-1">
                  <h4 className="font-garamond text-base font-bold text-text-primary">
                    {slot.segment}
                  </h4>
                  <p className="font-garamond text-sm text-text-secondary leading-relaxed">
                    {slot.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RECONNAISSANCE / FAQ ────────────────────────────────────── */}
        {event.faqs.length > 0 && (
          <div className="space-y-6 border-t flex flex-col gap-3 border-[#2e3a28]/10 pt-10">
            <h2 className="font-garamond text-3xl! font-bold text-primary  tracking-widest">
              FAQ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="space-y-2 bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28]/10 p-5 rounded-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <HelpCircle className="w-4 h-4 opacity-70" />
                    <h4 className="font-garamond text-base font-bold text-text-primary">
                      {faq.q}
                    </h4>
                  </div>
                  <p className="font-garamond text-sm text-text-secondary leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── FOOTER CONTACT LINK ────────────────────────────────────── */}
        <div className="border-t border-[#2e3a28]/10 pt-10 text-center font-ui text-[11px] text-text-muted  tracking-wider">
          Direct questions or accommodation adjustments toward the{" "}
          <a
          href="https://wa.me/qr/7OO5DRWMWX6JF1"
            className="text-primary! text-sm font-bold hover:text-primary/60! transition-colors"
          >
            Adjudication Core Desk
          </a>
          .
        </div>
      </div>
    </div>
  );
}
