/**
 * Interface representing a movie from the OMDb API.
 */
export default interface OMDbMovie {
	// Movie title
	Title?: string;

	// Length as a string
	Runtime?: string;

	// Genres
	Genre?: string;

	// Short/full
	Plot?: string;

	// Ratings
	Metascore?: string;
	imdbRating?: string;

	// Per the API, this shouldn't be in the response (posters for patrons only but it always... is?)
	Poster?: string;

	// Status ("True"/"False")
	Response: string;

	// Error message if any
	Error?: string;
}
