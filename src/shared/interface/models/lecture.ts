import WatchStatus from "shared/enum/watch-status";
import DetailFillable from "../detail-fillable";

/**
 * Interface representing a lecture.
 */
export interface Lecture extends DetailFillable {
    title: string;
    lectureNumber: number;
    watchStatus: WatchStatus;
    notes: string[];
}

export default Lecture;