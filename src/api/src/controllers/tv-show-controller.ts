import prisma from "db/db";
import TvShow from "@shared/interface/models/tv-show";
import { Genre } from "generated/prisma/enums";
import Season from "@shared/interface/models/season";
import { Episode } from "@shared/interface/models/episode";
import { CreateSeason, UpdateSeason } from "./season-controller";
import { DBTvShowToClient, SanitizeTvShowForDB } from "adapters/tv-shows";
import { SanitizeClientSeasonToDB } from "adapters/seasons";
import { SanitizeClientEpisodeToDB } from "adapters/episodes";
import axios from "axios";
import TvMazeShow from "3rdparty/tv-maze/interface/tv-maze-show";
import { TvMazeEpisodesToSeasons, TvMazeGenresToDB, TvMazeSummaryToDB } from "3rdparty/tv-maze/to-db";

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

        return tvShows.map(
            (tvShow): TvShow => DBTvShowToClient(tvShow)
        )
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
 * Inserts a TV show from the TV Maze API.
 * @param title If searching by title.
 * @param imdbId If searching by IMDb ID. If both are provided, IMDb ID is used.
 * @note At least one of title or imdbId must be provided.
 * @returns Object containing success status and optional error message.
 */
export async function InsertTvMazeShow(title?: string, imdbId?: string): Promise<{ success: boolean; errorMessage?: string }> {
    try {
        // Should never happen
        if (!title && !imdbId) {
            return {
                success: false,
                errorMessage: "Either title or IMDb ID must be provided."
            };
        }

        // Get the url
        const url = imdbId ? `https://api.tvmaze.com/lookup/shows?imdb=${imdbId}&embed=episodes` :
        `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(title)}&embed=episodes`;

        // Fetch from api
        const response = await axios.get<TvMazeShow>(url)
        .then((res) => res.data);

        // Map genre strings ==> Genre enums
        const genreArray = TvMazeGenresToDB(response.genres);

        // Map episodes ==> seasons
        const tvMazeSeasons = TvMazeEpisodesToSeasons(response._embedded.episodes);

        // Insert into the DB
        await prisma.show.create({
            data: {
                title: response.name,

                genres: {
                    create: genreArray.map((genre: Genre) => ({
                        genre: genre,
                    })),
                },

                rating: response.rating.average,

                // Use the same description for both (shortDescription is clipped in ui)
                shortDescription: TvMazeSummaryToDB(response.summary),
                description: TvMazeSummaryToDB(response.summary),

                // Create seasons by mapping episodes
                seasons: {
                    create: tvMazeSeasons.map((season) => ({
                        seasonNumber: season.seasonNumber,

                        // Avg of all episodes
                        rating: season.rating,

                        episodes: {
                            create: season.episodes.map((episode) => ({
                                episodeNumber: episode.number,
                                title: episode.name,
                                rating: episode.rating.average,
                                shortDescription: episode.summary,
                                length: episode.runtime,
                            }))
                        }
                    }))
                }
            }
        });

        return { success: true };
    }

    catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                errorMessage: error.response?.statusText || "Error fetching TV show from TV Maze API"
            }
        }

        return {
            success: false,
            errorMessage: error instanceof Error ? error.message : "An unexpected error occurred while inserting TV show from TV Maze API"
        };
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
