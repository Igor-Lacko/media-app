import Lecture from "@shared/interface/models/lecture";
import Subject from "@shared/interface/models/subject";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Submits a subject to the database.
 * @param subject Subject to submit.
 * @param lectures Lectures associated with the subject.
 * @param updating True if updating an existing subject, false if creating a new one.
 * @param id Identifier of the subject to update, if it has to be used.
 * @return True if successful, false otherwise.
 */
export default async function SubjectSubmitHandler(
    subject: Subject,
    lectures: Lecture[],
    updating: boolean,
    id: number = 0
): Promise<boolean> {
    // Only mandatory field
    if (subject.title === "") {
        return false;
    }

    // Add lectures from the form
    subject.lectures = lectures.map((lecture, index) => {
        return {
            ...lecture,
            lectureNumber: index + 1,
        };
    });

    // Submit
    try {
        if (updating) {
            await UpdateData<Subject>("api/subjects", id, subject);
        } 

        else {
            await CreateData<Subject>("api/subjects", subject);
        }

        return true;
    } 

    catch (error) {
        console.error("Error submitting subject:", error);
        return false;
    }
}
