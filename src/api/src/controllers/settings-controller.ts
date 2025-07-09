import prisma from "db/db";
import Settings from "@shared/interface/models/settings";

export async function NukeDatabase(): Promise<void> {
    try {
        await prisma.$transaction([
            prisma.movie.deleteMany(),
            prisma.show.deleteMany(),
            prisma.course.deleteMany(),
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

/**
 * Toggles the dark mode setting in the database.
 * @param darkMode The desired state of dark mode (true for enabled, false for disabled).
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateDarkMode(darkMode: boolean): Promise<boolean> {
    try {
        // UpdateMany is fine, there is only one row
        await prisma.settings.updateMany({
            data: {
                darkMode: darkMode
            }
        });

        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the IMDB key in the database and validates it with the IMDB API.
 * @param imdbKey Key to be set in the database.
 * @returns An object indicating success or failure, with an optional error message (api key invalid, internet connection error, etc).
 */
export async function UpdateIMDBKey(imdbKey: string): Promise<{ success: boolean, errorMessage?: string }> {
    // todo imdb api
    try {
        await prisma.settings.updateMany({
            data: {
                imdbApiKey: imdbKey
            }
        });

        return { success: true };
    }

    catch (error) {
        return { success: false, errorMessage: error }
    }
}