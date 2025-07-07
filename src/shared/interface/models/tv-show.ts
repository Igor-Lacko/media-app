import WatchStatus from "shared/enum/watch-status";
import DetailFillable from "../detail-fillable";
import Season from "./season";

/**
 * Interface representing a TV show.
 */
export interface TvShow extends DetailFillable {
    title: string;
    seasons: Season[];
    watchStatus: WatchStatus;
    isFavorite: boolean;
    toWatch: boolean;
}

export default TvShow;