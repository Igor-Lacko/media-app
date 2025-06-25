import WatchStatus from "shared/enum/watch-status";
import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";

/**
 * Interface representing a lecture.
 */
export interface Lecture extends CardDisplayable, DetailFillable {
    lectureNumber: number;
    watchStatus: WatchStatus;
    notes: string[];
}

export default Lecture;