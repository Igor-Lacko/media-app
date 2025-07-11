import { Genre } from "generated/prisma/enums";

/**
 * Converts a runtime string from the OMDb API to a number representing minutes.
 * @param runtime A string representing the runtime, e.g., "120 min".
 * @returns The runtime in minutes as a number.
 */
export function OMDbRuntimeToDB(runtime?: string): number {
    return parseInt(runtime.replace(' min', ''), 10);
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
    let genresArray : Genre[] = [Genre.ALL];

    // Map to an enum array
    for (const genre of genres.split(', ')) {
        const trimmed = genre.trim().toUpperCase();
        if (allowedGenres.includes(trimmed)) {
            genresArray.push(trimmed as Genre);
        }
    }

    return genresArray;
}

/**
 * Converts an array of ratings from the OMDb API to a number (average rating).
 * @param ratings An array of rating objects from the OMDb API.
 * @returns The average rating as a number.
 */
export function OMDbRatingsToDB(ratings: { Source: string; Value: string }[]): number {
    // Avoid zero division
    if (ratings.length === 0) {
        return 0;
    }

    // Sum(ratings.Value) / |ratings|
    return ratings.reduce((sum, rating) => {
        const value = parseFloat(rating.Value);
        return isNaN(value) ? sum : sum + value;
    }, 0) / ratings.length;
}