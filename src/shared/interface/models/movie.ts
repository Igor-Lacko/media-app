import WatchStatus from "shared/enum/watch-status";
import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";

export interface Movie extends CardDisplayable, DetailFillable {
    watchStatus: WatchStatus;
}

export default Movie;