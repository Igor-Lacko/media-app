import TvMazeEpisode from "./tv-maze-episode";

/**
 * Interface representing a intermediate structure for a TV season constructed from TV Maze API episodes.
 */
export default interface TvMazeSeason {
    // Self explanatory
    seasonNumber: number;
    episodes: TvMazeEpisode[];

    // Tv Maze API doesn't actualy provide a season rating, this is calcuated as the average of the episode ratings
    rating: number;
}