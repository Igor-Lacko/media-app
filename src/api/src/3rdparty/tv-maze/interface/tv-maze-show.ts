import TvMazeEpisode from "./tv-maze-episode";

/**
 * Interface for a response from the TV Maze shows API.
 */
export default interface TvMazeShow {
    // Self explanatory
    name: string;

    // Todo check out all genres they have
    genres: string[];

    // All examples have it like this ig?
    rating: { average: number };

    // Includes <p> and <b> tags for some reason, have to filter them out
    summary: string;

    // Append to response
    _embedded: {
        episodes: TvMazeEpisode[];
    }
}