import type { TournamentConfig } from "@prisma/client";

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export interface RegistryEventView {
  id: string;
  type: TournamentConfig["type"];
  status: TournamentConfig["status"];
  statusText: string;
  scopeText: string;
  title: string;
  dateString: string;
  monthGroup: string;
  dayString: string;
  location: string;
  format: string;
  description: string;
  isFeatured?: boolean;
}

export function toRegistryEvent(tournament: TournamentConfig): RegistryEventView {
  return {
    id: tournament.slug,
    type: tournament.type,
    status: tournament.status,
    statusText: tournament.statusText,
    scopeText: tournament.scopeText,
    title: tournament.title,
    dateString: tournament.dateString,
    monthGroup: MONTHS[tournament.sortDate.getUTCMonth()],
    dayString: String(tournament.sortDate.getUTCDate()),
    location: tournament.location,
    format: tournament.debateFormat,
    description: tournament.description,
    isFeatured: tournament.isFeatured,
  };
}

export interface ScheduleSlot {
  time: string;
  segment: string;
  details: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface EventDetailView {
  title: string;
  format: string;
  location: string;
  date: string;
  deadlineText?: string;
  type: TournamentConfig["type"];
  registration_type: TournamentConfig["registrationType"];
  registrationUrl?: string;
  description: string;
  whoShouldAttend: string[];
  schedule: ScheduleSlot[];
  faqs: FaqEntry[];
  includesPS: boolean;
}

export function toEventDetail(tournament: TournamentConfig): EventDetailView {
  return {
    title: tournament.title,
    format: tournament.debateFormat,
    location: tournament.location,
    date: tournament.dateString,
    deadlineText: tournament.deadlineText ?? undefined,
    type: tournament.type,
    registration_type: tournament.registrationType,
    registrationUrl: tournament.registrationUrl ?? undefined,
    description: tournament.description,
    whoShouldAttend: tournament.whoShouldAttend,
    schedule: (tournament.schedule as unknown as ScheduleSlot[]) ?? [],
    faqs: (tournament.faqs as unknown as FaqEntry[]) ?? [],
    includesPS: tournament.includesPS,
  };
}

export interface RegisterEventView {
  title: string;
  format: string;
  location: string;
  date: string;
  registrationType: TournamentConfig["registrationType"];
  adjudicatorPolicy: TournamentConfig["adjudicatorPolicy"];
  includesPS: boolean;
  psAdjudicatorsAllowed: boolean;
  statusText: string;
}

export function toRegisterEvent(tournament: TournamentConfig): RegisterEventView {
  return {
    title: tournament.title,
    format: tournament.debateFormat,
    location: tournament.location,
    date: tournament.dateString,
    registrationType: tournament.registrationType,
    adjudicatorPolicy: tournament.adjudicatorPolicy,
    statusText: tournament.statusText,
    includesPS: tournament.includesPS,
    psAdjudicatorsAllowed: tournament.psAdjudicatorsAllowed,
  };
}

export interface UpcomingEventView {
  id: string;
  date: string;
  time: string;
  title: string;
}

export function toUpcomingEvent(tournament: TournamentConfig): UpcomingEventView {
  const timeMatch = tournament.dateString.match(/\d{1,2}:\d{2}/);
  return {
    id: tournament.slug,
    date: tournament.dateString,
    time: timeMatch?.[0] ?? "",
    title: tournament.title,
  };
}
