import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local", override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL);
const db = new PrismaClient({ adapter });

const albums = [
  {
    slug: "varsity-open-2025",
    category: "TOURNAMENTS",
    year: 2025,
    title: "The Varsity Open Collision",
    subtitle: "Four days of rigorous debate, victory breaks, and unforgettable finals in the East.",
    dateString: "OCTOBER 2025",
    photoCount: 0,
    location: "MAIN AUDITORIUM",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    cloudinaryFolder: "gallery/varsity-open-2025",
    institutions: ["UNN", "UI", "UNILAG", "OAU"],
  },
  {
    slug: "pan-african-2025",
    category: "TOURNAMENTS",
    year: 2025,
    title: "Pan-African Championships",
    subtitle: "Documenting the coastal contingent, intense breakout rooms, and the Quarterfinal run.",
    dateString: "DECEMBER 2025",
    photoCount: 0,
    location: "ACCRA, GHANA",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    cloudinaryFolder: "gallery/pan-african-2025",
    institutions: ["UNN", "Accra", "Wits", "Makerere"],
  },
  {
    slug: "public-forum-2026",
    category: "SOCIALS",
    year: 2026,
    title: "The Chancellor's Exhibition Cup",
    subtitle: "An open public forum challenging campus funding structures before a packed house.",
    dateString: "FEB 2026",
    photoCount: 0,
    location: "ARTS THEATER",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    cloudinaryFolder: "gallery/public-forum-2026",
    institutions: ["All Chapters Welcome"],
  },
  {
    slug: "matter-loading-2026",
    category: "TRAININGS",
    year: 2026,
    title: "Geopolitical Case Framing",
    subtitle: "Late-night board deconstructions, extension structuring, and intensive novice drills.",
    dateString: "MAY 2026",
    photoCount: 0,
    location: "PRIMARY LECTURE THEATER",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    cloudinaryFolder: "gallery/matter-loading-2026",
    institutions: [],
  },
];

const tournaments = [
  {
    slug: "varsity-open-2026",
    type: "INTERNAL_HOST",
    status: "REGISTRATION_OPEN",
    statusText: "Applications open • Closes in 18 days",
    scopeText: "Open to everyone",
    title: "The Varsity Forensics Open",
    description:
      "Every October, universities from across West Africa gather at Nsukka for four days of spirited debate, systemic analysis, and deep competitive alignment. Our premier annual inter-collegiate collision is built to test policy execution under pure structural friction.",
    debateFormat: "BRITISH PARLIAMENTARY",
    deliveryMode: "OFFLINE",
    location: "UNN CAMPUS",
    dateString: "OCT 22-25, 2026",
    sortDate: new Date("2026-10-22"),
    deadlineText: "Applications close Oct 10",
    registrationUrl: null,
    registrationType: "TEAM",
    adjudicatorPolicy: "N_PLUS_ONE",
    fixedAdjudicatorCount: null,
    whoShouldAttend: [
      "Institutional delegations (Teams of 2)",
      "Independent adjudicators looking for circuit accreditation",
      "Student observers and novice analysts",
    ],
    schedule: [
      {
        time: "Thursday, Oct 22",
        segment: "Convening & Equity Briefing",
        details: "Check-in at the primary theater followed by mandatory code-of-conduct alignment.",
      },
      {
        time: "Friday, Oct 23",
        segment: "Rounds 1–3",
        details: "Adjudication pools formed; adjudication assignments cleared at 09:00.",
      },
      {
        time: "Saturday, Oct 24",
        segment: "Rounds 4–5 & Break Announcements",
        details: "Final preliminary push leading to the elite evening breakout announcement.",
      },
      {
        time: "Sunday, Oct 25",
        segment: "Out-rounds & Grand Final",
        details: "Elimination brackets culminate in the championship public debate theater.",
      },
    ],
    faqs: [
      {
        q: "Can we register multiple teams per institution?",
        a: "Yes. Institutional caps are initially set to 3 teams per chapter, expanding if capacity limits allow.",
      },
      {
        q: "Is there an independent adjudicator requirement?",
        a: "We enforce an N+1 rule for all attending regional institutional chapters.",
      },
    ],
    isFeatured: true,
  },
  {
    slug: "weekly-bp-training",
    type: "RECURRING_LOOP",
    status: "ONGOING",
    statusText: "Weekly Loop • Room for beginners",
    scopeText: "No prior experience required",
    title: "Forensic Case Training & Matter Loading",
    description:
      "Whether you are structuring your first case outline or polishing dynamic extension arguments for nationals, our weekly training sessions are where core analytical arguments are forged from scratch.",
    debateFormat: "BRITISH PARLIAMENTARY",
    deliveryMode: "OFFLINE",
    location: "PRIMARY LECTURE THEATER",
    dateString: "EVERY WEDNESDAY // 16:00",
    sortDate: new Date("2026-10-29"),
    deadlineText: null,
    registrationUrl: null,
    registrationType: "NONE",
    adjudicatorPolicy: "NONE",
    fixedAdjudicatorCount: null,
    whoShouldAttend: [
      "Absolute beginners with zero prior experience",
      "Current society members refining extension frameworks",
      "Public speakers wanting to learn logical analysis",
    ],
    schedule: [
      {
        time: "16:00 - 16:30",
        segment: "Matter Loading Lecture",
        details: "Deconstructing a global geopolitical or economic issue from absolute first principles.",
      },
      {
        time: "16:30 - 17:40",
        segment: "Live Exhibition Spar",
        details: "A structured practice round with real-time stops, tracking, and peer adjudication.",
      },
      {
        time: "17:40 - 18:00",
        segment: "Deconstruction & Feedback",
        details: "Individualized technical debriefs identifying strategic holes and style corrections.",
      },
    ],
    faqs: [
      { q: "Do I need to sign up ahead of time?", a: "No. This loop runs entirely on an open attendance framework. Walk right in." },
      { q: "What should I bring?", a: "A notebook, a pen, and an open mind. We provide all reading packets and topic breakdowns." },
    ],
    isFeatured: false,
  },
  {
    slug: "paudc-2026",
    type: "EXTERNAL_MAJOR",
    status: "CLOSING_SOON",
    statusText: "Trials Active • 4 Slots remaining",
    scopeText: "UNN National Delegation",
    title: "Pan-African Universities Debating Championship",
    description:
      "The ultimate continental arena for African collegiate forensics. Official institutional delegation units and trial schedules are managed tightly through our internal tracking frameworks.",
    debateFormat: "BRITISH PARLIAMENTARY",
    deliveryMode: "OFFLINE",
    location: "ACCRA, GHANA",
    dateString: "DEC 05-13, 2026",
    sortDate: new Date("2026-12-05"),
    deadlineText: null,
    // Placeholder — update via /admin/dashboard/tournaments with the real external listing URL.
    registrationUrl: "https://example.com/paudc-2026",
    registrationType: "NONE",
    adjudicatorPolicy: "NONE",
    fixedAdjudicatorCount: null,
    whoShouldAttend: [],
    schedule: [],
    faqs: [],
    isFeatured: false,
  },
];

for (const album of albums) {
  await db.album.upsert({ where: { slug: album.slug }, update: album, create: album });
}
console.log(`Seeded ${albums.length} albums.`);

for (const tournament of tournaments) {
  await db.tournamentConfig.upsert({
    where: { slug: tournament.slug },
    update: tournament,
    create: tournament,
  });
}
console.log(`Seeded ${tournaments.length} tournaments.`);

await db.$disconnect();
