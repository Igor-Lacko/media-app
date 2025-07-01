import Season from "@shared/interface/models/season";
import prisma from "db/db";
import { CreateEpisode, UpdateEpisode } from "./episode-controller";
import Episode from "@shared/interface/models/episode";
import { DBSeasonToClient, SanitizeClientSeasonToDB } from "adapters/seasons";
import { SanitizeClientEpisodeToDB } from "adapters/episodes";
import { UpdateSeasonNumbers } from "./tv-show-controller";

/**
 * Gets a season by its ID, including its episodes.
 * @param id Unique identifier of the season.
 * @returns Season object if found, null otherwise.
 */
export async function GetSeasonById(id: number): Promise<Season | null> {
    try {
        const season = await prisma.season.findUnique({
            where: {
                id: id
            },

            include: {
                episodes: true
            }
        });

        if (!season) {
            console.error(`Season with ID ${id} not found.`);
            return null;
        }

        return DBSeasonToClient(season);
    }

    catch (error) {
        console.error("Error fetching season by ID: " + error);
        return null;
    }
}

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
 * Updates the episode numbers for a season to be sequential.
 * Called after removing a episode, for example episode 2 -- 1 and 3 keep their numbers, so 3 has to be decremented.
 * @param seasonId Identifier of the season to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateEpisodeNumbers(seasonId: number) : Promise<boolean> {
    try {
        const episodes = await prisma.episode.findMany({
            where: {
                seasonId: seasonId
            },

            orderBy: {
                episodeNumber: 'asc'
            }
        });

        for (let i = 0; i < episodes.length; i++) {
            const episode = episodes[i];
            if (episode.episodeNumber !== i + 1) {
                await prisma.episode.update({
                    where: {
                        id: episode.id
                    },

                    data: {
                        episodeNumber: i + 1
                    }
                });
            }
        }
    }

    catch (error) {
        console.error("Error updating episode numbers: " + error);
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
        // Get the show ID first
        const showID = await prisma.season.findUnique({
            where: {
                id: id
            },

            select: {
                showId: true
            }
        });

        // Delete season
        await prisma.season.delete({
            where: {
                id: id
            }
        });

        // Update other seasons (should never fail but prisma query results are optional)
        return await UpdateSeasonNumbers(showID?.showId || -1);
    }

    catch (error) {
        console.error("Error deleting season: " + error);
        return false;
    }
}