import Episode from "./episode";

/**
 * Interface for tv show seasons.
 */
export interface Season {
    identifier?: number;
    seasonNumber: number;
    episodes: Episode[];
    rating?: number;
    description?: string;
    nofFinishedEpisodes: number;
}

export default Season;