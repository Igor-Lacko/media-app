import { PrismaClient } from "generated/prisma/client";

// Default env values
if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL = "file:./database.db";
}

if (!process.env.PRISMA_CLIENT_OUTPUT) {
	process.env.PRISMA_CLIENT_OUTPUT = "../src/generated/prisma";
}

const prisma = new PrismaClient();

export default prisma;
