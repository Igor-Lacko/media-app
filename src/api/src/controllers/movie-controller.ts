import prisma from "db/db";
import SortKey from "@shared/enum/sort-key";
import { Genre } from "generated/prisma/enums";
import { Movie } from "@shared/interface/movie";
/**
 * Gets all movies matching key and filter.
 * @param key To sort by, defaults to SortKey.NAME
 * @param filter To filter by, defaults to Genre.ALL
 * @returns List of movies.
 */
export async function GetMovies(
    key: SortKey = SortKey.NAME,
    filter: Genre = Genre.ALL
): Promise<Movie[]> {
    try {
        const movies = await prisma.movie.findMany({
            orderBy: {
                [key]: "desc",
            },

            where: {
                genres: {
                    some: {
                        genre: filter,
                    },
                },
            },

            include: {
                genres: true,
            },
        });

        // Map DB objects to movie interface for easier FE genre access
        return movies.map(
            (movie): Movie => ({
                ...movie,
                identifier: movie.id,
                genres: movie.genres.map((genre): Genre => genre.genre),
            })
        );
    } catch (error) {
        console.error("Error fetching movies: " + error);
        return [];
    }
}

/**
 * Inserts a movie into the database.
 * @param movie Movie to insert.
 * @returns Movie object if successful, null otherwise.
 */
export async function InsertMovie(movie: Movie): Promise<Movie | null> {
    try {
        await prisma.movie.create({
            data: {
                ...movie,
                genres: {
                    create: movie.genres.map((genre: Genre) => ({
                        genre: genre
                    }))
                },
            },
        });

        return movie;
    } catch (error) {
        console.error("Error inserting movie: " + error);
        return null;
    }
}
