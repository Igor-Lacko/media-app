import WatchStatus from "shared/enum/watch-status";
import DetailFillable from "../detail-fillable";
import Season from "./season";

/**
 * Interface representing a TV show.
 */
export interface TvShow extends DetailFillable {
    seasons: Season[];
    watchStatus: WatchStatus;
}

export default TvShow;