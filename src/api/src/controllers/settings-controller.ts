import prisma from "db/db";
import Settings from "@shared/interface/models/settings";

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

/**
 * Fetches the current settings from the database, or creates default settings if none exist.
 */
export async function GetSettings() : Promise<Settings> {
    try {
        const settings = await prisma.settings.findFirst();
        if (settings) {
            return settings;
        }

        // Create default
        const defaults = await prisma.settings.create({
            data: {
                darkMode: false,
            },
        });

        return defaults;
    }

    catch (error) {
        console.error("Error fetching settings:", error);
        throw new Error("Could not fetch settings");
    }
} 