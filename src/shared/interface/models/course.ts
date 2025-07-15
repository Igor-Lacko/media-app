import DetailFillable from "../detail-fillable";
import Lecture from "./lecture";

/**
 * Interface representing a course.
 */
export default interface Course extends DetailFillable {
	title: string;
	lectures: Lecture[];
	toWatch: boolean;
}
