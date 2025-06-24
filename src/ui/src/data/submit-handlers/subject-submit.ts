import Lecture from "@shared/interface/models/lecture";
import Subject from "@shared/interface/models/subject"
import { CreateData } from "data/crud/create";

/**
 * Submits a subject to the database.
 * @param subject Subject to submit.
 * @param lectures Lectures associated with the subject.
 * @return True if successful, false otherwise.
 */
export default async function SubjectSubmitHandler(subject: Subject, lectures: Lecture[]): Promise<boolean> {
    // Only mandatory field
    if(subject.title === "") {
        return false;
    }

    // Add lectures from the form
    subject.lectures = lectures.map((lecture, index) => {
        return {
            ...lecture,
            lectureNumber: index + 1
        }
    });

    // Submit
    try {
        if(await CreateData<Subject>("/api/subjects", subject)) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error submitting subject:", error);
        return false;
    }
}