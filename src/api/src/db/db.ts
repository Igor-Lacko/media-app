import { PrismaClient } from "generated/prisma/client";

import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import Course from "@shared/interface/models/course";
import Settings from "@shared/interface/models/settings";

// Default env values
if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL = "file:./database.db";
}

const prisma = new PrismaClient();

export default prisma;
