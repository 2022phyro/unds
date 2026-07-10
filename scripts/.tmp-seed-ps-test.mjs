import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env" });

const adapter = new PrismaPg(process.env.DATABASE_URL);
const db = new PrismaClient({ adapter });

const slug = "ps-verify-test";

await db.tournamentConfig.deleteMany({ where: { slug } });

const t = await db.tournamentConfig.create({
  data: {
    slug,
    type: "INTERNAL_HOST",
    status: "REGISTRATION_OPEN",
    statusText: "Applications open",
    scopeText: "Open to everyone",
    title: "PS Verify Test Tournament",
    description: "Test tournament for PS feature verification.",
    debateFormat: "BRITISH PARLIAMENTARY",
    deliveryMode: "OFFLINE",
    location: "Test Hall",
    dateString: "JAN 1, 2027",
    sortDate: new Date("2027-01-01"),
    registrationType: "INDIVIDUAL",
    adjudicatorPolicy: "N_PLUS_ONE",
    includesPS: true,
    psAdjudicatorsAllowed: true,
    schedule: [],
    faqs: [],
  },
});

console.log("Created tournament:", t.id, t.slug, { includesPS: t.includesPS, psAdjudicatorsAllowed: t.psAdjudicatorsAllowed });

await db.$disconnect();
