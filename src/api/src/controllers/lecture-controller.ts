import Lecture from "@shared/interface/models/lecture";
import { SanitizeClientLectureToDB } from "adapters/lectures";
import prisma from "db/db";

/**
 * Create a new lecture for a specific subject.
 * @param lecture Lecture object containing details about the lecture.
 * @param subjectId Identifier of the subject to which the lecture belongs.
 * @returns True if the creation was successful, false otherwise.
 */
export async function CreateLecture(lecture: Lecture, subjectId: number): Promise<boolean> {
    console.log("Creating new lecture:", lecture);
    const sanitizedLecture = SanitizeClientLectureToDB(lecture);

    try {
        await prisma.lecture.create({
            data: {
                ...sanitizedLecture,
                lectureNumber: lecture.lectureNumber === -1 ? await prisma.lecture.count({
                    where: {
                        subjectId: subjectId
                    }
                }) + 1 : lecture.lectureNumber,

                subject: {
                    connect: {
                        id: subjectId
                    }
                },

                // This will probably always be empty on creation, but just in case?
                notes: {
                    create: lecture.notes.map((note) => ({
                        content: note
                    }))
                }
            }
        })
    }

    catch (error) {
        console.error("Error creating lecture: " + error);
        return false;
    }
}

/**
 * Update a lecture by its ID.
 * @param id Lecture's unique identifier.
 * @param lecture Partial object containing fields to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateLecture(id : number, lecture: Partial<Lecture>): Promise<boolean> {
    console.log("Updating lecture with ID:", id);

    try {
        await prisma.lecture.update({
            where: {
                id: id
            },

            data: {
                ...lecture,

                // If provided
                notes: lecture.notes ? {
                    deleteMany: {},
                    create: lecture.notes.map((note) => ({
                        content: note
                    }))
                } : undefined,
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating lecture: " + error);
        return false;
    }
}

/**
 * Deletes a lecture by its ID.
 * @param id Lecture's unique identifier.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteLecture(id: number): Promise<boolean> {
    console.log("Deleting lecture with ID:", id);

    try {
        await prisma.lecture.delete({
            where: {
                id: id
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error deleting lecture: " + error);
        return false;
    }
}