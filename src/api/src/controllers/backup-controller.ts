import { DBData, DBOptions } from "@shared/export-types";
import { GetCourses, InsertCourse } from "./course-controller";
import { GetMovies } from "./movie-controller";
import { GetTvShows, InsertTvShow } from "./tv-show-controller";
import prisma from "db/db";
import { SanitizeClientMovieToDB } from "adapters/movies";
import { SuccessOrError } from "@shared/success-types";

/**
 * Returns the db with the params provided as JSON.
 * @param options What to include.
 * @returns A DB object with the requested data.
 */
export async function ExportDatabase(options: DBOptions): Promise<DBData> {
	try {
		return {
			movies: options.movies ? await GetMovies() : undefined,
			shows: options.shows ? await GetTvShows() : undefined,
			courses: options.courses ? await GetCourses() : undefined,
		};
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : "Unknown error",
		);
	}
}

/**
 * Loads the DB from the provided data.
 * @param data A object with movies/shows/courses.
 * @param rewrite If this is true, removes existing data before loading.
 */
export async function LoadDatabase(
	data: string,
	rewrite: boolean,
): Promise<SuccessOrError> {
	try {
		// Parse the data into a DBData object
		const parsedData: DBData = JSON.parse(data);

		// Remove existing data if passed the option to do so
		if (rewrite) {
			await prisma.$transaction([
				prisma.movie.deleteMany(),
				prisma.show.deleteMany(),
				prisma.course.deleteMany(),
			]);
		}

		// Create new data
		const sanitizedMovies =
			parsedData.movies ?
				parsedData.movies.map((movie) => SanitizeClientMovieToDB(movie))
			:	[];
		await prisma.$transaction(async (tx) => {
			// Create movies
			await tx.movie.createMany({ data: sanitizedMovies });

			// Create shows
			if (parsedData.shows) {
				for (const show of parsedData.shows) {
					await InsertTvShow(show, tx);
				}
			}

			// Create courses
			if (parsedData.courses) {
				for (const course of parsedData.courses) {
					await InsertCourse(course, tx);
				}
			}
		});

		// Very epic
		return { success: true };
	} catch (error) {
		return {
			success: false,
			errorMessage:
				error instanceof Error ?
					error.message.substring(0, 200)
				:	"Unknown error",
		};
	}
}
