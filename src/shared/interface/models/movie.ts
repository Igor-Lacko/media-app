import WatchStatus from "shared/enum/watch-status";
import DetailFillable from "../detail-fillable";

export interface Movie extends DetailFillable {
    title: string;
    watchStatus: WatchStatus;
    isFavorite: boolean;
}

export default Movie;