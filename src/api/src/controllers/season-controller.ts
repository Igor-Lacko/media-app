import Season from "@shared/interface/models/season";
import prisma from "db/db";
import { CreateEpisode, UpdateEpisode } from "./episode-controller";
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
    console.log("Show ID:", showId);

    try {
        await prisma.season.create({
            data: {
                ...sanitizedSeason,
                show: {
                    connect: {
                        id: showId
                    }
                },
                seasonNumber: season.seasonNumber === -1 ? await prisma.season.count({
                    where: {
                        showId: showId
                    }
                }) + 1 : season.seasonNumber,
                episodes: {
                    create: season.episodes.map((episode: Episode) => {
                        const sanitizedEpisode = SanitizeClientEpisodeToDB(episode) as Episode;
                        return {
                            ...sanitizedEpisode
                        }
                    })
                }
            }
        })

        console.log(`Created season: ${season.title} for show ID: ${showId}`);
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
                            notIn: sanitizedSeason.episodes
                                .filter((episode: Episode) => episode.identifier !== undefined)
                                .map((episode: Episode) => episode.identifier)
                        }
                    }
                } : undefined,
            }
        });

        // Update/create episodes
        if (seasonData.episodes) {
            for (const episode of seasonData.episodes) {
                episode.identifier ? await UpdateEpisode(episode.identifier, episode, id) :
                    await CreateEpisode(episode, id);
            }
        }

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