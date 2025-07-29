import prisma from "db/db";
import { Genre, WatchStatus } from "generated/prisma/enums";
import Movie from "@shared/interface/models/movie";
import { DBMovieToClient, SanitizeClientMovieToDB } from "adapters/movies";
import axios from "axios";
import OMDbMovie from "3rdparty/omdb/movie";
import {
	OMDbGenresToDB,
	OMDbRatingsToDB,
	OMDbRuntimeToDB,
} from "3rdparty/omdb/to-db";

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
		return movies.map((movie): Movie => DBMovieToClient(movie));
	} catch (error) {
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
			},
		});

		if (!movie) {
			return null;
		}

		// Construct shared movie object
		return DBMovieToClient(movie);
	} catch (error) {
		return null;
	}
}

/**
 * Makes a second OMDb request with the plot param set to "full" and returns the plot.
 * @note Pretty inefficient, but the API doesn't return both at once and idk of a other way to do it.
 * @param url URL to the OMDb API with the movie title or IMDb ID.
 * @returns Full plot description if found, null otherwise.
 */
async function GetFullDescriptionFromOMDb(
	url: string,
): Promise<string | undefined> {
	return await axios
		.get<OMDbMovie>(url + "&plot=full")
		.then((response) => {
			if (response.data.Response !== "True") {
				return undefined;
			}

			// Return full description
			return response.data.Plot || undefined;
		})
		.catch((_error) => {
			return undefined;
		});
}

/**
 * Inserts a movie into the database from OMDb API.
 * @param title Title of the movie to fetch.
 * @returns An object indicating success or failure, with an optional error message.
 */
export async function InsertMovieFromOMDb(
	title?: string,
	imdbId?: string,
): Promise<{ success: boolean; errorMessage?: string }> {
	try {
		// Fetch api key first
		const settings = await prisma.settings.findFirst({
			where: {
				omdbApiKey: {
					not: null,
				},
			},
			select: {
				omdbApiKey: true,
			},
		});

		const apiKey = settings?.omdbApiKey;

		// Shouldn't ever happen (this request should be allowed by the FE only if hasApiKey === true), but just in case
		if (!apiKey) {
			return { success: false, errorMessage: "OMDB API key not set." };
		}

		// OMDb request
		try {
			const url = imdbId
				? `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`
				: `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
						title!,
				  )}`;
			const response = await axios.get<OMDbMovie>(url);

			if (response.data.Response !== "True") {
				return {
					success: false,
					errorMessage: response.data.Error || "Movie not found.",
				};
			}

			// Covert genre1, genre2, ... to array of Genre objects
			const genreArray = OMDbGenresToDB(response.data.Genre!);

			// Full description
			const longDescription = await GetFullDescriptionFromOMDb(url);

			// Fetch settings to check if external images are allowed
			const showExternalImages = await prisma.settings.findFirst({
				select: {
					allowExternalImages: true,
				},
			})
				.then((settings) => settings?.allowExternalImages)
				.catch(() => false);

			// Image URL if allowed in settings
			const imageUrl = showExternalImages && response.data.Poster ? 
			response.data.Poster 
			: undefined;

			await prisma.movie.create({
				data: {
					title: response.data.Title || "",
					length: OMDbRuntimeToDB(response.data.Runtime!),
					shortDescription: response.data.Plot || "",
					description: longDescription || "",
					thumbnailUrl: imageUrl,
					genres: {
						create: genreArray.map((genre: Genre) => ({
							genre: genre,
						})),
					},
					rating: OMDbRatingsToDB(
						response.data.Metascore!,
						response.data.imdbRating!,
					),
				},
			});

			return { success: true };
		} catch (error) {
			// Fetch error
			if (axios.isAxiosError(error)) {
				const errorResponse = error.response?.data as {
					Error?: string;
				};
				return {
					success: false,
					errorMessage:
						errorResponse.Error ||
						error.message ||
						"An error occurred while fetching movie from OMDb",
				};
			}

			return {
				success: false,
				errorMessage:
					error instanceof Error
						? error.message
						: "An unexpected error occurred while fetching movie from OMDb",
			};
		}
	} catch (error) {
		// Other errors (prisma, ... etc.)
		return {
			success: false,
			errorMessage:
				error instanceof Error
					? error.message
					: "An unexpected error occurred while inserting movie from OMDb",
		};
	}
}
/**
 * Updates a movie in the database.
 * @param id Unique identifier of the movie to update.
 * @param movie Partial movie object containing fields to update.
 * @returns True if successful, false otherwise.
 */
export async function UpdateMovie(
	id: number,
	movie: Partial<Movie>,
): Promise<boolean> {
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
				watchStatus:
					sanitizedMovie.continueAt === sanitizedMovie.length &&
					sanitizedMovie.length &&
					sanitizedMovie.length !== 0
						? WatchStatus.COMPLETED
						: sanitizedMovie.watchStatus,

				genres: movie.genres
					? {
							deleteMany: {},
							create: movie.genres.map((genre: Genre) => ({
								genre: genre,
							})),
					  }
					: undefined,
			},
		});

		return true;
	} catch (error) {
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
					create: movie.genres!.map((genre: Genre) => ({
						genre: genre,
					})),
				},
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Deletes a movie by its ID.
 * @param id Unique identifier of the movie to delete.
 * @returns True if successful, false otherwise.
 */
export async function DeleteMovie(id: number): Promise<boolean> {
	try {
		await prisma.movie.delete({
			where: {
				id: id,
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}
