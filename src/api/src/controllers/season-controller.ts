import Season from "@shared/interface/models/season";
import prisma from "db/db";
import { UpdateEpisode } from "./episode-controller";
import Episode from "@shared/interface/models/episode";
import { SanitizeClientSeasonToDB } from "adapters/seasons";
import { SanitizeClientEpisodeToDB } from "adapters/episodes";

/**
 * Create a new season in the database.
 * @param season Season object to create.
 * @param showId Identifier of the show to which the season belongs.
 * @returns True if the creation was successful, false otherwise.
 */
export async function CreateSeason(season: Season, showId: number): Promise<boolean> {
    const sanitizedSeason = SanitizeClientSeasonToDB(season);
    console.log("Creating new season:", season);

    try {
        await prisma.season.create({
            data: {
                ...sanitizedSeason,
                showId: showId,
                episodes: {
                    create: season.episodes.map((episode : Episode) => {
                        const sanitizedEpisode = SanitizeClientEpisodeToDB(episode) as Episode;
                        return {
                            ...sanitizedEpisode
                        }
                    })
                }
            }
        })

        return true;
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
    const sanitizedSeason = SanitizeClientSeasonToDB(seasonData as Season);

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
                ...sanitizedSeason,

                // Delete episodes that are not in the new list
                episodes: sanitizedSeason.episodes ? {
                    deleteMany: {
                        id: {
                            notIn: sanitizedSeason.episodes.map((episode: Episode) => episode.identifier)
                        }
                    }
                } : undefined,
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