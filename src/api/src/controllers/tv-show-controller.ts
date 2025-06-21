import prisma from "db/db";
import SortKey from "@shared/enum/sort-key";
import { Genre, WatchStatus } from "generated/prisma/enums";
import { TvShow } from "@shared/interface/models/tv-show";
import { WASI } from "wasi";


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
    search?: string
): Promise<TvShow[]> {
    try {
        const tvShows = await prisma.show.findMany({
            orderBy: {
                [key]: "desc",
            },

            where: {
                genres: {
                    some: {
                        genre: filter,
                    },
                },

                title: {
                    contains: search ? search : ""
                }
            },

            include: {
                seasons: {
                    include: {
                        episodes: true,
                    }
                },

                genres: true,
            }
        });

        return tvShows.map(
            (show): TvShow => ({
                ...show,
                identifier: show.id,
                genres: show.genres.map((genre): Genre => genre.genre),
                nofFinishedSeasons: show.seasons.filter(
                    season => season.episodes.every(
                        episode => episode.watchStatus === WatchStatus.WATCHED
                    )
                ).length,
                seasons: []
            })
        )
    }

    catch (error) {
        console.error("Error fetching TV shows: " + error);
        return [];
    }
}