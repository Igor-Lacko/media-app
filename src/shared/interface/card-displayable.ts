import Genre from "shared/enum/genre";
import WatchStatus from "shared/enum/watch-status";
/**
 * Common interface for movies/shows/lectures that can be displayed in a card.
 */
export interface CardDisplayable {
    identifier?: number;
    title: string;
    rating?: number;
    thumbnailUrl?: string;
    shortDescription?: string;
    submediaString?: string; // 7 seasons or 5 lectures
    watchStatus?: WatchStatus;
    genres: Genre[];
}

export default CardDisplayable;