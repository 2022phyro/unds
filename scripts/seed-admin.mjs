// scripts/seed-admin.mjs
import { config as loadEnv } from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

loadEnv({ path: ".env", override: true });

const adapter = new PrismaPg(process.env.DATABASE_URL);
const db = new PrismaClient({ adapter });

async function run() {
  const args = process.argv.slice(2);
  const params = {};

  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, val] = arg.slice(2).split('=');
      params[key] = val !== undefined ? val : true;
    }
  });

  const email = params.email;
  const password = params.password;
  const firstName = params.first || "Admin";
  const lastName = params.last || "User";

  if (!email || !password) {
    console.error("Error: --email and --password are required.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await db.user.upsert({
      where: { email },
      update: { 
        passwordHash, 
        role: "ADMIN", 
        isStaff: true,
        firstName,
        lastName
      },
      create: { 
        email, 
        passwordHash, 
        role: "ADMIN", 
        isStaff: true,
        firstName,
        lastName
      },
    });

    console.log(`Admin user ready: ${user.email} (${user.firstName} ${user.lastName})`);
  } catch (err) {
    console.error("Failed to seed admin:", err);
  } finally {
    await db.$disconnect();
  }
}

run();