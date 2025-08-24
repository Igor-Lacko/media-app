import TvMazeEpisode from "./tv-maze-episode";

/**
 * Interface for a response from the TV Maze shows API.
 */
export default interface TvMazeShow {
	// Used when fetching by IMDB ID (which doesn't embed episodes) to make a second query
	id: number;

	// Self explanatory
	name: string;

	// Todo check out all genres they have
	genres: string[];

	// All examples have it like this ig?
	rating: { average: number };

	// Includes <p> and <b> tags for some reason, have to filter them out
	summary: string;

	// Append to response
	_embedded?: { episodes?: TvMazeEpisode[] };

	// Image (if set in settings to allow external images)
	image?: { medium: string; original: string };
}
