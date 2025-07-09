import prisma from "db/db";
import { Genre, WatchStatus } from "generated/prisma/enums";
import Movie from "@shared/interface/models/movie";
import { DBMovieToClient, SanitizeClientMovieToDB } from "adapters/movies";


/**
 * Gets all movies matching the given parameters.
 * @returns List of movies matching the parameters.
 */
export async function GetMovies(): Promise<Movie[]> {
    try {
        const movies = await prisma.movie.findMany({
            include: {
                genres: true,
            },
        });

        // Map DB objects to movie interface for easier FE genre access
        return movies.map(
            (movie): Movie => DBMovieToClient(movie)
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
        return DBMovieToClient(movie);
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
    const sanitizedMovie = SanitizeClientMovieToDB(movie as Movie);
    try {
        await prisma.movie.update({
            where: {
                id: id,
            },

            // If genres are to be updated delete all existing genres and create new ones
            data: {
                ...sanitizedMovie,

                // Set watch status to finished if continueAt === length and length actually is set
                watchStatus: sanitizedMovie.continueAt === sanitizedMovie.length && 
                sanitizedMovie.length && sanitizedMovie.length !== 0
                ? WatchStatus.COMPLETED : sanitizedMovie.watchStatus,

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
    const sanitizedMovie = SanitizeClientMovieToDB(movie as Movie);
    try {
        await prisma.movie.create({
            data: {
                ...sanitizedMovie,
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