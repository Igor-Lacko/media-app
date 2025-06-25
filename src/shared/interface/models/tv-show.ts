import WatchStatus from "shared/enum/watch-status";
import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";
import Season from "./season";

/**
 * Interface representing a TV show.
 */
export interface TvShow extends CardDisplayable, DetailFillable {
    seasons: Season[];
    watchStatus: WatchStatus;
}

export default TvShow;