import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local", override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars before running this script, e.g.:");
  console.error("  ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=change-me pnpm seed:admin");
  process.exit(1);
}

const adapter = new PrismaPg(process.env.DATABASE_URL);
const db = new PrismaClient({ adapter });

const passwordHash = await bcrypt.hash(password, 12);

const user = await db.user.upsert({
  where: { email },
  update: { passwordHash, role: "ADMIN", isStaff: true },
  create: { email, passwordHash, role: "ADMIN", isStaff: true },
});

console.log(`Admin user ready: ${user.email}`);
await db.$disconnect();
