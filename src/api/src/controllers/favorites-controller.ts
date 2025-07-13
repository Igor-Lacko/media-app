import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import { DBMovieToClient } from "adapters/movies";
import { DBTvShowToClient } from "adapters/tv-shows";
import prisma from "db/db";

/**
 * Fetches the user's favorite movies and TV shows.
 * @returns Array of favorite movies and TV shows.
 */
export async function GetFavorites(): Promise<(Movie | TvShow)[]> {
    try {
        // Fetch movies
        const favoriteMovies = await prisma.movie.findMany({
            where: {
                isFavorite: true,
            },

            include: {
                genres: true,
            }
        });

        // Fetch shows
        const favoriteTvShows = await prisma.show.findMany({
            where: {
                isFavorite: true,
            },

            include: {
                genres: true,
                seasons: {
                    include: {
                        episodes: true,
                    },
                },
            }
        });

        return [
            ...favoriteMovies.map(movie => DBMovieToClient(movie)),
            ...favoriteTvShows.map(show => DBTvShowToClient(show))
        ];
    }

    catch (error) {
        throw error;
    }
}