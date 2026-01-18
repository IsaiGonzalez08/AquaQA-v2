import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL_DEV;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  const pool = globalForPrisma.pool || new Pool({ connectionString });
  if (!globalForPrisma.pool) globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ["query"],
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
