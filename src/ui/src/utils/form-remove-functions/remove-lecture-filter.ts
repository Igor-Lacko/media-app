import Lecture from "@shared/interface/models/lecture";

/**
 * Removes a lecture from the list of lectures and updates the lecture numbers. Used in the form page.
 * @param removed The lecture to be removed.
 * @param lectures The current list of lectures.
 * @param setLectures Function to update the list of lectures.
 */
export default function RemoveLectureFilter(
	removed: Lecture,
	lectures: Lecture[],
	setLectures: (lectures: Lecture[]) => void,
) {
	const updatedLectures = lectures.filter(
		(lecture) => lecture.lectureNumber !== removed.lectureNumber,
	);

	setLectures(updatedLectures);
}
