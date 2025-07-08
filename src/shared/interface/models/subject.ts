import DetailFillable from "../detail-fillable";
import Lecture from "./lecture";

/**
 * Interface representing a subject.
 */
export default interface Subject extends DetailFillable {
    title: string;
    lectures: Lecture[];
    toWatch: boolean;
}