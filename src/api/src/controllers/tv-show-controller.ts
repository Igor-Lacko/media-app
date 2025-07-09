import prisma from "db/db";
import TvShow from "@shared/interface/models/tv-show";
import { Genre } from "generated/prisma/enums";
import Season from "@shared/interface/models/season";
import { Episode } from "@shared/interface/models/episode";
import { CreateSeason, UpdateSeason } from "./season-controller";
import { DBTvShowToClient, SanitizeTvShowForDB } from "adapters/tv-shows";
import { SanitizeClientSeasonToDB } from "adapters/seasons";
import { SanitizeClientEpisodeToDB } from "adapters/episodes";

/**
 * Gets all TV shows matching the given parameters.
 * @returns List of TV shows matching the parameters.
 */
export async function GetTvShows(): Promise<TvShow[]> {
    try {
        const tvShows = await prisma.show.findMany({
            include: {
                seasons: {
                    include: {
                        episodes: true,
                    },
                },

                genres: true,
            },
        });

        return tvShows;
    } catch (error) {
        console.error("Error fetching TV shows: " + error);
        return [];
    }
}

/**
 * Returns a TV show by its ID.
 * @param id Unique identifier of the TV show.
 * @returns TvShow object if found (should always), null otherwise.
 */
export async function GetTvShowById(id: number): Promise<TvShow | null> {
    try {
        const tvShow = await prisma.show.findUnique({
            where: {
                id: id,
            },

            include: {
                seasons: {
                    include: {
                        episodes: true,
                    },
                },

                genres: true,
            },
        });

        if (!tvShow) {
            return null;
        }

        // Construct shared TV show object, map seasons/episodes
        return DBTvShowToClient(tvShow);
    } catch (error) {
        console.error("Error fetching TV show by ID: " + error);
        return null;
    }
}

/**
 * Updates a TV show by its ID.
 * @param id TV show's unique identifier.
 * @param tvShowData Partial object containing fields to update.
 * @returns True if successful, false otherwise.
 */
export async function UpdateTvShow(
    id: number,
    tvShowData: Partial<TvShow>
): Promise<boolean> {
    // Remove unwanted fields
    const sanitized = SanitizeTvShowForDB(tvShowData as TvShow);

    // Update rest of the show
    try {
        await prisma.show.update({
            where: {
                id: id,
            },

            data: {
                ...sanitized,

                // Delete seasons not present in the update, or ignore if seasons object not passed
                seasons: sanitized.seasons
                    ? {
                        deleteMany: {
                            id: {
                                notIn: sanitized.seasons
                                    .filter((season: Season) => season.identifier !== undefined)
                                    .map((season: Season) => season.identifier),
                            },
                        },
                    }
                    : undefined,

                // Simpler than updating genres separately
                genres: sanitized.genres
                    ? {
                        deleteMany: {},
                        create: sanitized.genres.map((genre: Genre) => ({
                            genre: genre,
                        })),
                    }
                    : undefined,
            },
        });

        // Create/update non-deleted seasons
        if (tvShowData.seasons) {
            for (const season of tvShowData.seasons) {
                season.identifier
                    ? await UpdateSeason(season.identifier, season)
                    : await CreateSeason(season, id);
            }
        }

        return true;
    } catch (error) {
        console.error("Error updating TV show: " + error);
        return false;
    }
}

/**
 * Updates the season numbers for a TV show to be sequential.
 * @param id Identifier of the TV show to update.
 * @returns True if successful, false otherwise.
 */
export async function UpdateSeasonNumbers(id: number): Promise<boolean> {
    try {
        const seasons = await prisma.season.findMany({
            where: {
                showId: id,
            },

            orderBy: {
                seasonNumber: "asc",
            },
        });

        for (let i = 0; i < seasons.length; i++) {
            const season = seasons[i];
            if (season.seasonNumber !== i + 1) {
                await prisma.season.update({
                    where: {
                        id: season.id,
                    },

                    data: {
                        seasonNumber: i + 1,
                    },
                });
            }
        }
    } catch (error) {
        console.error("Error updating season numbers: " + error);
        return false;
    }
}

/**
 * Inserts a TV show into the database.
 * @param tvShow TvShow to insert.
 * @returns TvShow object if successful, null otherwise.
 */
export async function InsertTvShow(tvShow: TvShow): Promise<boolean> {
    const sanitizedTvShow = SanitizeTvShowForDB(tvShow);
    try {
        await prisma.show.create({
            data: {
                ...sanitizedTvShow,
                seasons: {
                    create: tvShow.seasons.map((season: Season) => {
                        const sanitizedSeason = SanitizeClientSeasonToDB(season);
                        return {
                            ...sanitizedSeason,
                            episodes: {
                                create: season.episodes.map((episode: Episode) => {
                                    const sanitizedEpisode = SanitizeClientEpisodeToDB(
                                        episode
                                    ) as Episode;
                                    return {
                                        ...sanitizedEpisode,
                                    };
                                }),
                            },
                        };
                    }),
                },

                genres: {
                    create: tvShow.genres.map((genre: Genre) => ({
                        genre: genre,
                    })),
                },
            },
        });

        console.log(`Inserted TV show: ${tvShow.title}`);
        return true;
    } catch (error) {
        console.error("Error inserting TV show: " + error);
        return false;
    }
}

/**
 * Deletes a TV show by its ID.
 * @param id Identifier of the TV show to delete.
 * @returns True if successful, false otherwise.
 */
export async function DeleteTvShow(id: number): Promise<boolean> {
    console.log("Deleting TV show with ID:", id);

    // Seasons and episodes deleted by cascade
    try {
        await prisma.show.delete({
            where: {
                id: id,
            },
        });

        return true;
    } catch (error) {
        console.error("Error deleting TV show: " + error);
        return false;
    }
}
