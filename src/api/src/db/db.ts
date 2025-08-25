import { PrismaClient } from "generated/prisma/client";

// Default env values
if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL = "file:./database.db";
}

const prisma = new PrismaClient();

export default prisma;
