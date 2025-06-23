import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";
import Lecture from "./lecture";

/**
 * Interface representing a subject.
 */
export interface Subject extends CardDisplayable, DetailFillable {
    lectures: Lecture[];
}

export default Subject;