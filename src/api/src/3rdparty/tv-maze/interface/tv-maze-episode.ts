/**
 * Interface for a response from the TV Maze episodes API.
 */
export default interface TvMazeEpisode {
    // Also self explanatory
    name: string;

    // Season number
    season: number;

    // Episode number
    number: number;

    // Rating
    rating: { average: number };

    // Includes some weird hex characters, todo filter
    summary: string;
}