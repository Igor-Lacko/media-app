import Lecture from "@shared/interface/models/lecture";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Validates and submits a lecture to the server.
 * @param lecture Lecture object to be submitted.
 * @param updating If true, the lecture is being updated; if false, a new lecture is being created.
 * @param id Id of the course to which the lecture belongs, if creating.
 */
export default async function SubmitLecture(
	lecture: Lecture,
	updating: boolean,
	id: number = 0,
): Promise<boolean> {
	// Basically only mandatory field
	if (lecture.title === "") {
		return false;
	}

	// Create/update and return
	try {
		if (updating) {
			await UpdateData<Lecture>(
				"api/lectures",
				lecture.identifier!,
				lecture,
			);
		} else {
			await CreateData<Lecture>(`api/lectures/${id}`, lecture);
		}

		return true;
	} catch (error) {
		return false;
	}
}
