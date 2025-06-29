import prisma from "db/db";
import SortKey from "@shared/enum/sort-key";
import { Genre } from "generated/prisma/enums";
import { Movie } from "@shared/interface/models/movie";


/**
 * Gets all movies matching the given parameters.
 * @param key To sort by, defaults to SortKey.NAME
 * @param filter To filter by, defaults to Genre.ALL
 * @param search To search (if the movie title contains the string).
 * @returns List of movies matching the parameters.
 */
export async function GetMovies(
    key: SortKey = SortKey.NAME,
    filter: Genre = Genre.ALL,
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
 * Returns a movie by its ID.
 * @param id Unique identifier of the movie.
 * @returns Movie object if found (should always), null otherwise.
 */
export async function GetMovieById(id: number): Promise<Movie | null> {
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: id,
            },

            include: {
                genres: true,
            }
        });

        if (!movie) {
            console.error(`Movie with ID ${id} not found.`);
            return null;
        }

        // Construct shared movie object
        return {
            ...movie,
            identifier: movie.id,
            genres: movie.genres.map((genre): Genre => genre.genre)
        };
    }

    catch (error) {
        console.error("Error fetching movie by ID: " + error);
        return null;
    }
}

/**
 * Updates a movie in the database.
 * @param id Unique identifier of the movie to update.
 * @param movie Partial movie object containing fields to update.
 * @returns True if successful, false otherwise.
 */
export async function UpdateMovie(id: number, movie: Partial<Movie>): Promise<boolean> {
    console.log("Updating movie: ", movie);
    try {
        await prisma.movie.update({
            where: {
                id: id,
            },

            // If genres are to be updated delete all existing genres and create new ones
            data: {
                ...movie,
                genres: movie.genres ? {
                    deleteMany: {},
                    create: movie.genres.map((genre: Genre) => ({
                        genre: genre
                    }))
                } : undefined,
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating movie: " + error);
        return false;
    }
}

/**
 * Inserts a movie into the database.
 * @param movie Movie to insert.
 * @returns True if successful, false otherwise.
 */
export async function InsertMovie(movie: Movie): Promise<boolean> {
    console.log("Inserting movie: ", movie);
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

        console.log(`Inserted movie: ${movie.title}`);

        return true;
    } catch (error) {
        console.error("Error inserting movie: " + error);
        return false;
    }
}

/**
 * Deletes a movie by its ID.
 * @param id Unique identifier of the movie to delete.
 * @returns True if successful, false otherwise.
 */
export async function DeleteMovie(id: number): Promise<boolean> {
    console.log("Deleting movie with ID:", id);

    try {
        await prisma.movie.delete({
            where: {
                id: id,
            },
        });

        return true;
    } 

    catch (error) {
        console.error("Error deleting movie: " + error);
        return false;
    }
}