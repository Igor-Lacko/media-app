import ClientLecture from "@shared/interface/models/lecture";
import { Lecture, Note } from "generated/prisma/client";

export interface DBLecture extends Lecture {
    notes: Note[];
}

export function SanitizeClientLectureToDB (lecture : ClientLecture): ClientLecture {
    const {
        identifier,
        submediaString,
        description,
        rating,
        thumbnailUrl,
        shortDescription,
        genres,
        ...sanitizedLecture
    } = lecture;

    return sanitizedLecture;
}

export function DBLectureToClient (lecture: DBLecture): ClientLecture {
    const { id, ...data } = lecture;
    return {
        ...data,
        identifier: id,
        notes: lecture.notes.map((note) => {
            return {content: note.content, timestamp: note.timestamp}
        })
    };
}