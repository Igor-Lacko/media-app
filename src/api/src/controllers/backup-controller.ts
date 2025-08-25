import { DBData, DBOptions } from "@shared/export-types";
import { GetCourses } from "./course-controller";
import { GetMovies } from "./movie-controller";
import { GetTvShows } from "./tv-show-controller";
import prisma from "db/db";
import { SanitizeClientMovieToDB } from "adapters/movies";
import { SanitizeClientCourseToDB } from "adapters/courses";
import { SanitizeTvShowForDB } from "adapters/tv-shows";
import { SanitizeClientSeasonToDB } from "adapters/seasons";
import { SanitizeClientEpisodeToDB } from "adapters/episodes";
import { SanitizeClientLectureToDB } from "adapters/lectures";
import TvShow from "@shared/interface/models/tv-show";
import Course from "@shared/interface/models/course";
import { PrismaClient } from "@prisma/client";
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
 * Part of the transaction to load the DB from given data. Loads Tv Shows (and their seasons/their episodes).
 * @param shows Array of TV shows to load.
 * @param client Prisma Client instance.
 */
async function InsertBulkShows(
	shows: TvShow[],
	client: PrismaClient,
): Promise<void> {
	for (const show of shows) {
		await client.show.create({
			data: {
				...SanitizeTvShowForDB(show),
				seasons: {
					create: show.seasons.map((season) => ({
						...SanitizeClientSeasonToDB(season),
						episodes: {
							create: season.episodes.map((episode) => ({
								...SanitizeClientEpisodeToDB(episode),
							})),
						},
					})),
				},
			},
		});
	}
}

/**
 * Inserts multiple courses into the database.
 * @param courses Array of courses to insert.
 * @param client Prisma Client instance.
 */
async function InsertBulkCourses(
	courses: Course[],
	client: PrismaClient,
): Promise<void> {
	for (const course of courses) {
		await client.course.create({
			data: {
				...SanitizeClientCourseToDB(course),
				lectures: {
					create: course.lectures.map((lecture) => ({
						...SanitizeClientLectureToDB(lecture),
						notes: {
							create: lecture.notes.map((note) => ({
								content: note.content,
							})),
						},
					})),
				},
			},
		});
	}
}

/**
 * Loads the DB from the provided data.
 * @param data A object with movies/shows/courses.
 * @param rewrite If this is true, removes existing data before loading.
 */
export async function LoadDatabase(
	data: DBData,
	rewrite: boolean,
): Promise<SuccessOrError> {
	try {
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
			data.movies ?
				data.movies.map((movie) => SanitizeClientMovieToDB(movie))
			:	[];
		await prisma.$transaction(async (tx) => {
			await tx.movie.createMany({ data: sanitizedMovies });
			if (data.shows) {
				await InsertBulkShows(data.shows, tx);
			}
			if (data.courses) {
				await InsertBulkCourses(data.courses, tx);
			}
		});
		return { success: true };
	} catch (error) {
		return {
			success: false,
			errorMessage:
				error instanceof Error ? error.message : "Unknown error",
		};
	}
}
