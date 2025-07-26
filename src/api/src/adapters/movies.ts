import ClientMovie from "@shared/interface/models/movie";
import { EntertainmentGenre, Movie } from "generated/prisma/client";
import { Genre } from "generated/prisma/enums";
import ClientGenre from "@shared/enum/genre";

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
		genres: movie.genres.map((genre): ClientGenre => genre.genre as ClientGenre),
	};
}
