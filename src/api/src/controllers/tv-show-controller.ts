import prisma from "db/db";
import SortKey from "@shared/enum/sort-key";
import { TvShow } from "@shared/interface/models/tv-show";
import { Genre } from "generated/prisma/enums";
import { Season } from "@shared/interface/models/season";
import { Episode } from "@shared/interface/models/episode";
import GetOrderBy from "utils/order-by";
import { SortTvShows } from "utils/sort";

/**
 * Gets all TV shows matching the given parameters.
 * @param key To sort by, defaults to SortKey.NAME
 * @param filter To filter by, defaults to Genre.ALL
 * @param search To search (if the show title contains the string).
 * @returns List of TV shows matching the parameters.
 */
export async function GetTvShows(
    key: SortKey = SortKey.NAME,
    filter: Genre = Genre.ALL,
): Promise<TvShow[]> {
    try {
        const tvShows = await prisma.show.findMany({
            orderBy: GetOrderBy(key),

            where: {
                genres: {
                    some: {
                        genre: filter,
                    },
                },
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

        return SortTvShows(
            tvShows.map(
                (show): TvShow => ({
                    ...show,
                    identifier: show.id,
                    genres: show.genres.map((genre): Genre => genre.genre),
                    seasons: [], // Since we are just displaying on a card?
                    submediaString: `${show.seasons.length} seasons`,
                })
            ),
            key
        );
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
        return {
            ...tvShow,
            identifier: tvShow.id,
            genres: tvShow.genres.map((genre): Genre => genre.genre),
            submediaString: `${tvShow.seasons.length} seasons`,
            seasons: tvShow.seasons.map((season): Season => (
                {
                    ...season,
                    title: `Season ${season.seasonNumber}`,
                    identifier: season.id,
                    episodes: season.episodes.map((episode) : Episode => (
                        {
                            seasonNumber: season.seasonNumber,
                            ...episode
                        }
                    ))
                }
            ))
        };
    }

    catch (error){
        console.error("Error fetching TV show by ID: " + error);
        return null;
    }
}

/**
 * Inserts a TV show into the database.
 * @param tvShow TvShow to insert.
 * @returns TvShow object if successful, null otherwise.
 */
export async function InsertTvShow(tvShow: TvShow): Promise<TvShow | null> {
    try {
        await prisma.show.create({
            data: {
                ...tvShow,
                seasons: {
                    create: tvShow.seasons.map((season: Season) => ({
                        ...season,
                        episodes: {
                            create: season.episodes.map((episode: Episode) => ({
                                // Can't do ...episode due to seasonNumber
                                episodeNumber: episode.episodeNumber,
                                title: episode.title,
                                rating: episode.rating,
                                shortDescription: episode.shortDescription,
                                videoUrl: episode.videoUrl,
                                thumbnailUrl: episode.thumbnailUrl,
                                length: episode.length
                            })),
                        },
                    })),
                },

                genres: {
                    create: tvShow.genres.map((genre: Genre) => ({
                        genre: genre,
                    })),
                },
            },
        });

        console.log(`Inserted TV show: ${tvShow.title}`);
        return tvShow;
    } catch (error) {
        console.error("Error inserting TV show: " + error);
        return null;
    }
}
