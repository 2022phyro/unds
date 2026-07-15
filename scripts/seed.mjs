import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local", override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL);
const db = new PrismaClient({ adapter });

const albums = [
  // {
  //   slug: "anudc-23",
  //   category: "TOURNAMENTS", // Maps to your AlbumCategory Enum
  //   year: 2023,
  //   title: "10th All-Nigeria Universities Debating Championship",
  //   subtitle: "The Veritas Clash",
  //   dateString: "SEPTEMBER 2023",
  //   location: "Veritas University, Abuja",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1784022700/IMG_5540_ztmcbf.jpg",
  //   institutions: ["ANUDC", "Veritas University", "UNN", "UI", "Unilorin"],
  //   cloudinaryFolder: "unds/anudc-23",
  //   photoCount: 0,
  // },
  // {
  //   slug: "anudc-25",
  //   category: "TOURNAMENTS",
  //   year: 2025,
  //   title: "12th All-Nigeria Universities Debating Championship",
  //   subtitle: "UNILORIN National Championship",
  //   dateString: "AUGUST 2025",
  //   location: "University of Ilorin, Ilorin",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1783936489/user-uploads/GAV05445_cjgfuk.jpg",
  //   institutions: ["UNILORIN", "UNN", "FUTO", "FUTA", "Veritas", "UI", "ANUDC", "..."],
  //   cloudinaryFolder: "unds/anudc-25",
  //   photoCount: 0,
  // },
  // {
  //   slug: "anydc-24",
  //   category: "TOURNAMENTS",
  //   year: 2024,
  //   title: "2nd All Nigerian Youth Debate Championship",
  //   subtitle: "Shaping Youth Policy",
  //   dateString: "NOVEMBER 2024",
  //   location: "Nnamdi Azikiwe University, Awka",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1784022058/A35_ciqfoh.jpg",
  //   institutions: ["Debaterverse", "Top Boys", "UNIZIK"],
  //   cloudinaryFolder: "unds/anydc-24",
  //   photoCount: 0,
  // },
  // {
  //   slug: "anydc-25",
  //   category: "TOURNAMENTS",
  //   year: 2025,
  //   title: "3rd All Nigerian Youth Debate Championship (ANYDC 3.0)",
  //   subtitle: "The Next Gen of Orators",
  //   dateString: "APRIL 2025",
  //   location: "University of Benin, Benin City",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1784022036/102_ed1ztm.jpg",
  //   institutions: ["UNIBEN", "Debaterverse", "Top Boys"],
  //   cloudinaryFolder: "unds/anydc-25",
  //   photoCount: 0,
  // },
  // {
  //   slug: "anydc-26",
  //   category: "TOURNAMENTS",
  //   year: 2026,
  //   title: "4th All Nigerian Youth Debate Championship (ANYDC 4.0)",
  //   subtitle: "The Conversation Comes Home",
  //   dateString: "MARCH 2026",
  //   location: "Godfrey Okoye University, Enugu",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1783937938/unds/IMG_9687.jpg",
  //   institutions: ["GOUNI", "Debaterverse"],
  //   cloudinaryFolder: "unds/anydc-26",
  //   photoCount: 0,
  // },
  // {
  //   slug: "training",
  //   category: "TRAININGS",
  //   year: 2026,
  //   title: "Weekly Debate Drills & Spars",
  //   subtitle: "Building the Case File",
  //   dateString: "WEEKLY",
  //   location: "UNN Debate Hub",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1784069444/PXL_20240209_180951576.MV_rpc3vj.jpg",
  //   institutions: ["UNN"],
  //   cloudinaryFolder: "unds/training",
  //   photoCount: 0,
  // },
  // {
  //   slug: "hangouts",
  //   category: "SOCIALS",
  //   year: 2025,
  //   title: "Society Hangouts & Team Bonding",
  //   subtitle: "Unwinding from the Podiums",
  //   dateString: "AUGUST 2025",
  //   location: "UNN Debate Hub",
  //   imageUrl: "https://res.cloudinary.com/boo1tgkf/image/upload/v1784022212/PXL_20240119_171241039.MV_dpuovt.jpg",
  //   institutions: ["UNN"],
  //   cloudinaryFolder: "unds/hangouts",
  //   photoCount: 0,
  // },
];

const tournaments = [
  {
    slug: "anudc-2026",
    type: "EXTERNAL_MAJOR",
    status: "REGISTRATION_LOCKED",       // Matches schema EventStatus
    statusText: "Coming Soon • Stay Tuned",
    scopeText: "National Championship",
    title: "13th All-Nigeria Universities Debating Championship (ANUDC)",
    description: "The premier national inter-university platform for British Parliamentary debate, public speaking, and quiz competitions in Nigeria. Prepare to witness the finest minds from across the federation gather for intellectual excellence.",
    debateFormat: "BRITISH PARLIAMENTARY",
    deliveryMode: "OFFLINE",
    location: "RIVERS STATE UNIVERSITY, PORT HARCOURT",
    dateString: "SEP 06 - 13, 2026",
    sortDate: new Date("2026-09-06T00:00:00.000Z"),
    deadlineText: "Official registrations opening soon",
    registrationUrl: null,
    registrationType: "NONE",
    adjudicatorPolicy: "NONE",
    fixedAdjudicatorCount: null,
    includesPS: true,
    psAdjudicatorsAllowed: false,
    whoShouldAttend: [
      "Collegiate Debaters",
      "Public Speakers",
      "Accredited Adjudicators",
      "Debate Enthusiasts"
    ],
    schedule: [
      {
        time: "TBD",
        segment: "Arrival & Registration",
        details: "Official schedules and timing slots will be announced as the event approaches."
      },
      {
        time: "TBD",
        segment: "Tournament Opening",
        details: "Stay tuned for the unveiling of the official master schedule."
      }
    ],
    faqs: [
      {
        question: "When do registrations start?",
        answer: "The official registration portal, timeline guidelines, and institutional invitations will be released soon."
      },
      {
        question: "Where is the venue?",
        answer: "The championship will be hosted at Rivers State University (RSU), Port Harcourt."
      }
    ],
    isFeatured: false
  },
  {
    slug: "paudc-2026",
    type: "EXTERNAL_MAJOR",
    status: "REGISTRATION_LOCKED",       // Matches schema EventStatus
    statusText: "Coming Soon • Mark Your Calendars",
    scopeText: "Continental Championship",
    title: "Pan-African Universities Debating Championship (PAUDC)",
    description: "The ultimate continental arena for African collegiate forensics. Moving under the banner of 'The Republic of Reason' and heralded by the Sound of Africa's Resolve (The Kakaki), Africa's flagship championship makes its historic landing in Nigeria.",
    debateFormat: "BRITISH PARLIAMENTARY",
    deliveryMode: "OFFLINE",
    location: "VERITAS UNIVERSITY, ABUJA, NIGERIA",
    dateString: "DEC 05 - 13, 2026",
    sortDate: new Date("2026-12-05T00:00:00.000Z"),
    deadlineText: "Portals open soon",
    registrationUrl: null,
    registrationType: "NONE",
    adjudicatorPolicy: "NONE",
    fixedAdjudicatorCount: null,
    includesPS: true,
    psAdjudicatorsAllowed: false,
    whoShouldAttend: [
      "African Institutional Delegations",
      "Pan-African Public Speakers",
      "Continental Adjudicators & Observers"
    ],
    schedule: [
      {
        time: "TBD",
        segment: "Event Schedule Pending",
        details: "Detailed day-by-day itineraries spanning debate preliminary rounds, civic panels, and the Legacy Lab will be updated closer to the event."
      }
    ],
    faqs: [
      {
        question: "When will details be finalized?",
        answer: "Complete travel guides, visa request instructions, and event details are slated for release soon."
      },
      {
        question: "Who is hosting PAUDC 2026?",
        answer: "The championship is proudly hosted by Veritas University in Abuja."
      }
    ],
    isFeatured: false
  }
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
