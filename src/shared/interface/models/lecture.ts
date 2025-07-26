import WatchStatus from "@shared/enum/watch-status";
import DetailFillable from "../detail-fillable";
import Note from "./note";

/**
 * Interface representing a lecture.
 */
export interface Lecture extends DetailFillable {
	title: string;
	lectureNumber: number;
	watchStatus: WatchStatus;
	notes: Note[];
	lastWatchedAt?: number;
}

export default Lecture;
