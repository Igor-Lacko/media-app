import LastWatched from "@shared/interface/last-watched";
import prisma from "db/db";

/**
 * Returns the last watched items.
 * @param limit How many items to return. If set to -1 (default), returns all items.
 */
export async function GetLastWatchedItems(
	limit: number = -1,
): Promise<LastWatched[] | null> {
	try {
		// Get the last watched movies (simplest part, don't need parent titles)
		const lastWatchedMovies: LastWatched[] = await prisma.movie
			.findMany({
				where: {
					lastWatchedAt: { not: null },

					videoUrl: { not: null },
				},

				orderBy: { lastWatchedAt: "desc" },

				include: { genres: true },
			})
			.then((movies) => {
				// Can straight map to LastWatched object
				return movies.map((movie) => {
					return {
						title: movie.title,
						continueAt: movie.continueAt,
						length: movie.length!,
						thumbnailUrl: movie.thumbnailUrl || undefined,
						shouldHaveThumbnail: true,
						lastWatchedAt: movie.lastWatchedAt!,
						url: `/movies/${movie.id}/play`,
						filePath: movie.videoUrl!,
					};
				});
			});

		// Get the last watched episodes (have to go through tvshows)
		const lastWatchedEpisodes: LastWatched[] = await prisma.episode
			.findMany({
				where: {
					lastWatchedAt: { not: null },

					videoUrl: { not: null },
				},

				orderBy: { lastWatchedAt: "desc" },

				// Select season for url, show and title
				include: {
					season: {
						// And select show for title/thumbnail url
						include: {
							show: {
								select: {
									title: true,
									thumbnailUrl: true,
									id: true,
								},
							},
						},
					},
				},
			})
			.then((episodes) => {
				// Convert each episode to a LastWatched object
				return episodes.map((episode) => {
					const { season, ...rest } = episode;

					// Map to LastWatched object
					return {
						title: season.show.title,
						subTitle: `S${season.seasonNumber}E${rest.episodeNumber}: ${rest.title}`,
						continueAt: rest.continueAt,
						length: rest.length!,
						thumbnailUrl: season.show.thumbnailUrl || undefined,
						shouldHaveThumbnail: true,
						lastWatchedAt: rest.lastWatchedAt!,
						url: `/tv-shows/${season.show.id}/${season.id}/${rest.id}/play`,
						filePath: rest.videoUrl!,
					};
				});
			});

		// Lectures, have to get to course for the title and link
		const lastWatchedLectures: LastWatched[] = await prisma.lecture
			.findMany({
				where: {
					lastWatchedAt: { not: null },

					videoUrl: { not: null },
				},

				include: { course: { select: { title: true, id: true } } },
			})
			.then((lectures) => {
				return lectures.map((lecture) => {
					// Map to LastWatched object
					return {
						title: lecture.course.title,
						subTitle: `Lecture ${lecture.lectureNumber}: ${lecture.title}`,
						continueAt: lecture.continueAt,
						length: lecture.length!,
						shouldHaveThumbnail: false,
						lastWatchedAt: lecture.lastWatchedAt!,
						url: `/courses/${lecture.course.id}/${lecture.id}/play`,
						filePath: lecture.videoUrl!,
					};
				});
			});

		// Combine all items and sort them by last watched date
		return [
			...lastWatchedMovies,
			...lastWatchedEpisodes,
			...lastWatchedLectures,
		]
			.sort((a, b) => b.lastWatchedAt - a.lastWatchedAt)
			.slice(0, limit === -1 ? undefined : limit);
	} catch (error) {
		return null;
	}
}
