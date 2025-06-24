import Subject from "@shared/interface/models/subject"
import { CreateData } from "data/crud/create";

/**
 * Submits a subject to the database.
 * @param subject Subject to submit.
 * @return True if successful, false otherwise.
 */
export default async function SubjectSubmitHandler(subject: Subject): Promise<boolean> {
    if(subject.title === "") {
        return false;
    }

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