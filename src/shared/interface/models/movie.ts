import WatchStatus from "shared/enum/watch-status";
import DetailFillable from "../detail-fillable";

export default interface Movie extends DetailFillable {
	title: string;
	watchStatus: WatchStatus;
	isFavorite: boolean;
	lastWatchedAt?: number;
}
