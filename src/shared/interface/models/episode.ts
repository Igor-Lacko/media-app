import WatchStatus from "shared/enum/watch-status";

/**
 * Interface for tv show episodes.
 */
export interface Episode {
    identifier?: number;
    seasonNumber: number;
    episodeNumber: number;
    title: string;
    rating?: number;
    description?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    length?: number;
    continueAt: number;
    watchStatus: WatchStatus;
}

export default Episode;