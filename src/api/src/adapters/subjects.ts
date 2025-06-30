import ClientSubject from "@shared/interface/models/subject";
import { Subject } from "generated/prisma/client";
import { DBLectureToClient, DBLecture } from "./lectures";

interface DBSubject extends Subject {
    lectures: DBLecture[];
}

export function SanitizeClientSubjectToDB(
    subject: ClientSubject
): ClientSubject {
    const {
        identifier,
        submediaString,
        videoUrl,
        length,
        description,
        continueAt,
        thumbnailUrl,
        shortDescription,
        watchStatus,
        rating,
        genres,
        ...sanitizedSubject
    } = subject;

    return sanitizedSubject;
}

export function DBSubjectToClient (subject: DBSubject): ClientSubject {
    const { id, ...data } = subject;
    return {
        ...data,
        identifier: id,
        submediaString: `${subject.lectures.length} lectures`,
        lectures: subject.lectures.map(lecture => DBLectureToClient(lecture))
    }
}