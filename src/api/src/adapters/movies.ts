import ClientMovie from "@shared/interface/models/movie";
import { EntertainmentGenre, Movie } from "generated/prisma/client";
import { Genre } from "generated/prisma/enums";
import ClientGenre from "@shared/enum/genre";
import WatchStatus from "@shared/enum/watch-status";

export interface DBMovie extends Movie {
	genres: EntertainmentGenre[];
}

export function SanitizeClientMovieToDB(movie: ClientMovie): ClientMovie {
	// Remove fields that should not be stored in the database
	const { identifier, submediaString, ...sanitizedMovie } = movie;

	// Return the new DB data object
	return sanitizedMovie;
}

export function DBMovieToClient(movie: DBMovie): ClientMovie {
	const { id, ...data } = movie;
	return {
		...data,
		identifier: id,
		watchStatus: movie.watchStatus as WatchStatus,
		lastWatchedAt: movie.lastWatchedAt || undefined,
		videoUrl: movie.videoUrl || undefined,
		length: movie.length || undefined,
		description: movie.description || undefined,
		rating: movie.rating || undefined,
		thumbnailUrl: movie.thumbnailUrl || undefined,
		shortDescription: movie.shortDescription || undefined,
		genres: movie.genres.map((genre): ClientGenre => genre.genre as ClientGenre),
	};
}
