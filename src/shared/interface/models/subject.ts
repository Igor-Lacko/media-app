import DetailFillable from "../detail-fillable";
import Lecture from "./lecture";

/**
 * Interface representing a subject.
 */
export interface Subject extends DetailFillable {
    lectures: Lecture[];
}

export default Subject;