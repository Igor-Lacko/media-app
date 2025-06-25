import WatchStatus from "shared/enum/watch-status";
import DetailFillable from "../detail-fillable";

export interface Movie extends DetailFillable {
    watchStatus: WatchStatus;
}

export default Movie;