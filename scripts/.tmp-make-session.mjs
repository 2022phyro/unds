import { SignJWT } from "jose";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config({ path: ".env" });

const adapter = new PrismaPg(process.env.DATABASE_URL);
const db = new PrismaClient({ adapter });

const admin = await db.user.findFirst({ where: { role: "ADMIN" } });
if (!admin) {
  console.error("No admin user found");
  process.exit(1);
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const token = await new SignJWT({ userId: admin.id, email: admin.email, role: admin.role, isStaff: admin.isStaff })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(secret);

console.log(token);
await db.$disconnect();
