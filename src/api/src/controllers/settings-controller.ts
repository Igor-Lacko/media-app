import prisma from "db/db";

export async function NukeDatabase(): Promise<void> {
    try {
        await prisma.$transaction([
            prisma.movie.deleteMany(),
            prisma.show.deleteMany(),
            prisma.episode.deleteMany(),
            prisma.season.deleteMany(),
        ]);
        console.log("Database nuked successfully.");
    } catch (error) {
        console.error("Error nuking database:", error);
    }
}