import Lecture from "@shared/interface/models/lecture";
import Course from "@shared/interface/models/course";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Submits a course to the database.
 * @param Course Course to submit.
 * @param lectures Lectures associated with the course.
 * @param updating True if updating an existing course, false if creating a new one.
 * @param id Identifier of the course to update, if it has to be used.
 * @return True if successful, false otherwise.
 */
export default async function CourseSubmitHandler(
	course: Course,
	lectures: Lecture[],
	updating: boolean,
	id: number = 0,
): Promise<boolean> {
	// Only mandatory field
	if (
		course.title === "" ||
		lectures.some((lecture) => lecture.title === "")
	) {
		return false;
	}

	// Add lectures from the form
	course.lectures = lectures.map((lecture, index) => {
		return {
			...lecture,
			lectureNumber: index + 1,
		};
	});

	// Submit
	try {
		if (updating) {
			await UpdateData<Course>("api/courses", id, course);
		} else {
			await CreateData<Course>("api/courses", course);
		}

		return true;
	} catch (error) {
		return false;
	}
}
