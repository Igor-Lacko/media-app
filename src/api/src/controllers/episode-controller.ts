import Episode from "@shared/interface/models/episode";
import prisma from "db/db";

/**
 * Update an episode by its ID. Also called by UpdateSeason() which is called by UpdateTvShow().
 * @param id Episode's unique identifier.
 * @param episodeData Partial object containing fields to update.
 */
export async function UpdateEpisode(id: number, episodeData: Partial<Episode>): Promise<boolean> {
    // Debug todo remove
    console.log("Updating episode with ID:", id);
    try {
        await prisma.episode.update({
            where: {
                id: id
            },

            // Can't use the spread operator here due to seasonNumber not being part of the prisma schema
            data: {
                episodeNumber: episodeData.episodeNumber || undefined,
                title: episodeData.title || undefined,
                rating: episodeData.rating || undefined,
                shortDescription: episodeData.shortDescription || undefined,
                videoUrl: episodeData.videoUrl || undefined,
                length: episodeData.length || undefined
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
        await prisma.episode.delete({
            where: {
                id: id
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error deleting episode: " + error);
        return false;
    }
}