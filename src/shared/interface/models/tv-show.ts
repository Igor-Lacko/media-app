import WatchStatus from "@shared/enum/watch-status";
import DetailFillable from "../detail-fillable";
import Season from "./season";

/**
 * Interface representing a TV show.
 */
export default interface TvShow extends DetailFillable {
	title: string;
	seasons: Season[];
	watchStatus: WatchStatus;
	isFavorite: boolean;
}
