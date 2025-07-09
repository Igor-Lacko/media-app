import ClientCourse from "@shared/interface/models/course";
import { Course } from "generated/prisma/client";
import { DBLectureToClient, DBLecture } from "./lectures";

export interface DBCourse extends Course {
    lectures: DBLecture[];
}

export function SanitizeClientCourseToDB(
    Course: ClientCourse
): ClientCourse {
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
        ...sanitizedCourse
    } = Course;

    return sanitizedCourse;
}

export function DBCourseToClient (Course: DBCourse): ClientCourse {
    const { id, ...data } = Course;
    return {
        ...data,
        identifier: id,
        submediaString: `${Course.lectures.length} lectures`,
        lectures: Course.lectures.map(lecture => DBLectureToClient(lecture))
    }
}