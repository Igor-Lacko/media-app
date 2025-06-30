import WatchStatus from "shared/enum/watch-status";
import CardDisplayable from "../card-displayable";

/**
 * Interface for tv show episodes.
 */
export interface Episode extends CardDisplayable {
    title: string;
    seasonId: number;
    seasonNumber: number;
    episodeNumber: number;
    videoUrl?: string;
    length?: number;
    continueAt: number;
    watchStatus: WatchStatus;
}

export default Episode;