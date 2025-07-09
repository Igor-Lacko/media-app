import Episode from "@shared/interface/models/episode";
import { DBEpisodeToClient, SanitizeClientEpisodeToDB } from "adapters/episodes";
import prisma from "db/db";
import { UpdateEpisodeNumbers } from "./season-controller";
import { WatchStatus } from "generated/prisma/enums";

/**
 * Fetches a episode by its ID.
 * @param id Unique identifier of the episode.
 * @returns Episode object if found, null otherwise.
 */
export async function GetEpisodeById(id: number): Promise<Episode | null> {
    try {
        const episode = await prisma.episode.findUnique({
            where: {
                id: id
            }
        });

        if (!episode) {
            console.error(`Episode with ID ${id} not found.`);
            return null;
        }

        return DBEpisodeToClient(episode);
    }

    catch (error) {
        console.error("Error fetching episode by ID: " + error);
        return null;
    }
}

/**
 * Create a new episode in the database.
 * @param episode Episode object to create.
 * @param seasonId Identifier of the season to which the episode belongs.
 * @returns True if the creation was successful, false otherwise.
 */
export async function CreateEpisode(episode: Episode, seasonId: number): Promise<boolean> {
    const sanitizedEpisode = SanitizeClientEpisodeToDB(episode) as Episode;
    try {
        await prisma.episode.create({
            data: {
                ...sanitizedEpisode,
                episodeNumber: episode.episodeNumber === -1 ? await prisma.episode.count({
                    where: {
                        seasonId: seasonId
                    }
                }) + 1 : episode.episodeNumber,
                season: {
                    connect: {
                        id: seasonId
                    }
                }
            }
        })

        return true;
    }

    catch (error) {
        console.error("Error creating episode: " + error);
        return false;
    }
}

/**
 * Update an episode by its ID.
 * @param id Episode's unique identifier.
 * @param episodeData Partial object containing fields to update.
 * @returns True if successful, false otherwise.
 */
export async function UpdateEpisode(id: number, episodeData: Partial<Episode>): Promise<boolean> {
    const sanitizedEpisode = SanitizeClientEpisodeToDB(episodeData as Episode) as Episode;
    // Debug todo remove
    console.log("Updating episode with ID:", id);
    try {
        await prisma.episode.update({
            where: {
                id: id
            },

            // Can't use the spread operator here due to seasonNumber not being part of the prisma schema
            data: {
                ...sanitizedEpisode,
                watchStatus: sanitizedEpisode.continueAt === sanitizedEpisode.length 
                && sanitizedEpisode.length && sanitizedEpisode.length !== 0 ?
                WatchStatus.COMPLETED : sanitizedEpisode.watchStatus
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating episode: " + error);
        return false;
    }
}

/**
 * Update an episode by its ID and season ID. Called by UpdateSeason()
 * @param id Episode's unique identifier.
 * @param episodeData Partial object containing fields to update.
 * @param seasonId Identifier of the season to which the episode belongs.
 * @returns True if successful, false otherwise.
 */
export async function UpdateOrCreateEpisode(id: number, episodeData: Partial<Episode>, seasonId?: number): Promise<boolean> {
    const sanitizedEpisode = SanitizeClientEpisodeToDB(episodeData as Episode) as Episode;
    // Debug todo remove
    console.log("Updating episode with ID:", id);
    try {
        await prisma.episode.upsert({
            where: {
                id: id
            },

            // Can't use the spread operator here due to seasonNumber not being part of the prisma schema
            update: {
                ...sanitizedEpisode
            },

            create: {
                ...sanitizedEpisode,
                season: {
                    connect: {
                        id: seasonId
                    }
                }
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating episode: " + error);
        return false;
    }
}

/**
 * Deletes an episode by its ID.
 * @param id Identifier of the episode to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteEpisode(id: number): Promise<boolean> {
    console.log("Deleting episode with ID:", id);

    try {
        // Get the season ID first
        const seasonID = await prisma.episode.findUnique({
            where: {
                id: id
            },
            select: {
                seasonId: true
            }
        });

        // Delete the episode
        await prisma.episode.delete({
            where: {
                id: id
            }
        });

        // Update other episodes in the season
        return await UpdateEpisodeNumbers(seasonID?.seasonId || -1);
    }

    catch (error) {
        console.error("Error deleting episode: " + error);
        return false;
    }
}