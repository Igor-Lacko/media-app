import prisma from "db/db";
import Course from "@shared/interface/models/course";
import { CreateLecture, UpdateLecture } from "./lecture-controller";
import Lecture from "@shared/interface/models/lecture";
import { DBCourseToClient, SanitizeClientCourseToDB } from "adapters/courses";
import { SanitizeClientLectureToDB } from "adapters/lectures";
import Note from "@shared/interface/models/note";

/**
 * Gets all courses matching the given parameters.
 * @returns List of courses matching the parameters.
 */
export async function GetCourses() : Promise<Course[]> {
    try {
        const courses = await prisma.course.findMany({
            include: {
                lectures: {
                    include: {
                        notes: true
                    }
                }
            }
        });

        return courses.map(
            (course): Course => DBCourseToClient(course)
        )
    }

    catch (error) {
        console.error("Error fetching Courses: " + error);
        return [];
    }
}

/**
 * Returns a course by its ID.
 * @param id Unique identifier of the course.
 * @returns Course object if found, null otherwise.
 */
export async function GetCourseById(id: number): Promise<Course | null> {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: id
            },

            include: {
                lectures: {
                    include: {
                        notes: true
                    }
                }
            }
        });

        if (!course) {
            return null;
        }

        // Map lectures and notes
        return DBCourseToClient(course);
    }

    catch (error) {
        console.error("Error fetching Course by ID: " + error);
        return null;
    }
}

/**
 * Inserts a course into the database.
 * @param Course course to insert.
 * @returns course object if successful, null otherwise.
 */
export async function InsertCourse(course: Course): Promise<boolean> {
    const sanitizedCourse = SanitizeClientCourseToDB(course);
    try {
        await prisma.course.create({
            data: {
                ...sanitizedCourse,
                lectures: {
                    create: course.lectures.map((lecture : Lecture) => {
                        const sanitizedLecture = SanitizeClientLectureToDB(lecture);
                        return {
                            ...sanitizedLecture,
                            notes: {
                                create: lecture.notes.map((note: Note) => ({
                                    content: note.content
                                }))
                            }
                        }
                    })
                }
            }
        });

        console.log(`Inserted Course: ${course.title}`);
        return true;
    }

    catch (error) {
        console.error("Error inserting Course: " + error);
        return false;
    }
}

/**
 * Updates a course by its ID.
 * @param id Identifier of the course to update.
 * @param CourseData Partial object containing fields to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateCourse(id: number, CourseData: Partial<Course>): Promise<boolean>  {
    const sanitizedCourse = SanitizeClientCourseToDB(CourseData as Course);
    console.log("Updating Course with ID:", id);

    // Update lectures first (if provided)
    if(sanitizedCourse.lectures) {
        for (const lecture of sanitizedCourse.lectures) {
            lecture.identifier ? await UpdateLecture(lecture.identifier, lecture) :
            await CreateLecture(lecture, id);
        }
    }

    // Update the Course itself
    try {
        await prisma.course.update({
            where: {
                id: id
            },

            data: {
                ...sanitizedCourse,

                // Delete lectures not present in the update, or ignore if lectures object not passed
                lectures: sanitizedCourse.lectures ? {
                    deleteMany: {
                        id: {
                            notIn: sanitizedCourse.lectures
                            .filter((lecture: Lecture) => lecture.identifier !== undefined)
                            .map((lecture : Lecture) => lecture.identifier)
                        }
                    }
                } : undefined,
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating Course: " + error);
        return false;
    }
}

/**
 * Deletes a course by its ID.
 * @param id Identifier of the course to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteCourse(id: number): Promise<boolean> {
    console.log("Deleting Course with ID:", id);

    // Lectures deleted by cascade
    try {
        await prisma.course.delete({
            where: {
                id: id
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error deleting Course: " + error);
        return false;
    }
} 