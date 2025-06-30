import prisma from "db/db";
import Subject from "@shared/interface/models/subject";
import SortKey from "@shared/enum/sort-key";
import { SortSubjects } from "utils/sort";
import GetOrderBy from "utils/order-by";
import { CreateLecture, UpdateLecture } from "./lecture-controller";
import Lecture from "@shared/interface/models/lecture";
import { DBSubjectToClient, SanitizeClientSubjectToDB } from "adapters/subjects";
import { SanitizeClientLectureToDB } from "adapters/lectures";

/**
 * Gets all subjects matching the given parameters.
 * @param key To sort by, defaults to SortKey.NAME
 * @returns List of subjects matching the parameters.
 */
export async function GetSubjects(key: SortKey) : Promise<Subject[]> {
    try {
        const subjects = await prisma.subject.findMany({
            orderBy: GetOrderBy(key),

            include: {
                lectures: {
                    include: {
                        notes: true
                    }
                }
            }
        });

        return SortSubjects(
            subjects.map(subject => DBSubjectToClient(subject)),
            key
        );
    }

    catch (error) {
        console.error("Error fetching subjects: " + error);
        return [];
    }
}

/**
 * Returns a subject by its ID.
 * @param id Unique identifier of the subject.
 * @returns Subject object if found, null otherwise.
 */
export async function GetSubjectById(id: number): Promise<Subject | null> {
    try {
        const subject = await prisma.subject.findUnique({
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

        if (!subject) {
            return null;
        }

        // Map lectures and notes
        return DBSubjectToClient(subject);
    }

    catch (error) {
        console.error("Error fetching subject by ID: " + error);
        return null;
    }
}

/**
 * Inserts a subject into the database.
 * @param subject Subject to insert.
 * @returns Subject object if successful, null otherwise.
 */
export async function InsertSubject(subject: Subject): Promise<boolean> {
    const sanitizedSubject = SanitizeClientSubjectToDB(subject);
    try {
        await prisma.subject.create({
            data: {
                ...sanitizedSubject,
                lectures: {
                    create: subject.lectures.map((lecture : Lecture) => {
                        const sanitizedLecture = SanitizeClientLectureToDB(lecture);
                        return {
                            ...sanitizedLecture,
                            notes: {
                                create: lecture.notes.map((note : string) => ({
                                    content: note
                                }))
                            }
                        }
                    })
                }
            }
        });

        console.log(`Inserted subject: ${subject.title}`);
        return true;
    }

    catch (error) {
        console.error("Error inserting subject: " + error);
        return false;
    }
}

/**
 * Updates a subject by its ID.
 * @param id Identifier of the subject to update.
 * @param subjectData Partial object containing fields to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateSubject(id: number, subjectData: Partial<Subject>): Promise<boolean>  {
    const sanitizedSubject = SanitizeClientSubjectToDB(subjectData as Subject);
    console.log("Updating subject with ID:", id);

    // Update lectures first (if provided)
    if(sanitizedSubject.lectures) {
        for (const lecture of sanitizedSubject.lectures) {
            lecture.identifier ? await UpdateLecture(lecture.identifier, lecture) :
            await CreateLecture(lecture, id);
        }
    }

    // Update the subject itself
    try {
        await prisma.subject.update({
            where: {
                id: id
            },

            data: {
                ...sanitizedSubject,

                // Delete lectures not present in the update, or ignore if lectures object not passed
                lectures: sanitizedSubject.lectures ? {
                    deleteMany: {
                        id: {
                            notIn: sanitizedSubject.lectures
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
        console.error("Error updating subject: " + error);
        return false;
    }
}

/**
 * Deletes a subject by its ID.
 * @param id Identifier of the subject to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteSubject(id: number): Promise<boolean> {
    console.log("Deleting subject with ID:", id);

    // Lectures deleted by cascade
    try {
        await prisma.subject.delete({
            where: {
                id: id
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error deleting subject: " + error);
        return false;
    }
} 