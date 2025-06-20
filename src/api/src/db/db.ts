import { GetMovies } from "controllers/movie-controller";
import { NukeDatabase } from "controllers/settings-controller";
import { PrismaClient } from "generated/prisma/client";
import seedMovies from "utils/insert-mock-data";

const prisma = new PrismaClient();

export default prisma;