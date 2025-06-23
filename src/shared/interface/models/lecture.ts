import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";

/**
 * Interface representing a lecture.
 */
export interface Lecture extends CardDisplayable, DetailFillable {
    notes: string[];
}

export default Lecture;