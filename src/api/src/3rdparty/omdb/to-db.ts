import { Genre } from "generated/prisma/enums";

/**
 * Converts a runtime string from the OMDb API to a number representing seconds.
 * @param runtime A string representing the runtime, e.g., "120 min".
 * @returns The runtime in seconds as a number.
 */
export function OMDbRuntimeToDB(runtime?: string): number {
	return parseInt(runtime.replace(" min", ""), 10) * 60 || 0;
}

/**
 * Converts a string of genres from the OMDb API to an array of Genre enums.
 * @param genres A comma-separated string of genres from the OMDb API.
 * @returns An array of Genre enums.
 */
export function OMDbGenresToDB(genres: string): Genre[] {
	// Values that match the DB enum
	const allowedGenres = Object.values(Genre)
		.map((genre) => genre.toUpperCase())
		.filter((genre) => genre !== Genre.ALL);

	// All movies have Genre.ALL
	let genresArray: Genre[] = [Genre.ALL];

	// Map to an enum array
	for (const genre of genres.split(", ")) {
		const trimmed = genre.trim().toUpperCase();
		if (allowedGenres.includes(trimmed)) {
			genresArray.push(trimmed as Genre);
		}
	}

	return genresArray;
}

/**
 * Averages the Metascore and IMDB ratings from the OMDb API.
 * @param metascore The Metascore from the OMDb API.
 * @param imdbRating The IMDB rating from the OMDb API.
 * @returns The average rating as a number.
 */
export function OMDbRatingsToDB(metascore: string, imdbRating: string): number {
	const metascoreValue = parseFloat(metascore);
	const imdbRatingValue = parseFloat(imdbRating);

	if (isNaN(metascoreValue) && isNaN(imdbRatingValue)) {
		return 0;
	} else if (isNaN(metascoreValue)) {
		return imdbRatingValue;
	} else if (isNaN(imdbRatingValue)) {
		return metascoreValue;
	}

	// Metascore is /100, imdb is /10
	return (metascoreValue / 10 + imdbRatingValue) / 2;
}
