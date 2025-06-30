import Season from "@shared/interface/models/season";
import prisma from "db/db";
import { UpdateEpisode } from "./episode-controller";
import Episode from "@shared/interface/models/episode";

/**
 * Create a new season in the database.
 * @param season Season object to create.
 * @returns True if the creation was successful, false otherwise.
 */
export async function CreateSeason(season: Season): Promise<boolean> {
    console.log("Creating new season:", season);

    try {
        await prisma.season.create({
            data: {
                ...season,
                episodes: {
                    create: season.episodes.map((episode : Episode) => ({
                        episodeNumber: episode.episodeNumber,
                        title: episode.title,
                        rating: episode.rating,
                        shortDescription: episode.shortDescription,
                        videoUrl: episode.videoUrl,
                        thumbnailUrl: episode.thumbnailUrl,
                        length: episode.length
                    }))
                }
            }
        })
    }

    catch (error) {
        console.error("Error creating season: " + error);
        return false;
    }
}

/**
 * Update a season by its ID. Also called by UpdateTvShow().
 * @param id Identifier of the season to update.
 * @param seasonData Partial object containing fields to update.
 * @returns Updated Season object if successful, null otherwise.
 */
export async function UpdateSeason(id: number, seasonData: Partial<Season>): Promise<boolean> {
    // Debug todo remove
    console.log("Updating season with ID:", id);

    // Update episodes first (if provided)
    if (seasonData.episodes) {
        for (const episode of seasonData.episodes) {
            await UpdateEpisode(episode.identifier, episode);
        }
    }

    try {
        await prisma.season.update({
            where: {
                id: id
            },

            data: {
                ...seasonData,

                // Already updated, can safely ignore now
                episodes: undefined,
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating season: " + error);
        return false;
    }
}

/**
 * Deletes a season by its ID.
 * @param id Identifier of the season to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteSeason(id: number): Promise<boolean> {
    console.log("Deleting season with ID:", id);

    // Episodes deleted by cascade
    try {
        await prisma.season.delete({
            where: {
                id: id
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error deleting season: " + error);
        return false;
    }
}