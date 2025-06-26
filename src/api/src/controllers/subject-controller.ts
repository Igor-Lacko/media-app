import prisma from "db/db";
import Subject from "@shared/interface/models/subject";
import SortKey from "@shared/enum/sort-key";
import { SortSubjects } from "utils/sort";
import GetOrderBy from "utils/order-by";
import { UpdateLecture } from "./lecture-controller";

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
            subjects.map(
                (subject): Subject => ({
                    ...subject,
                    identifier: subject.id,
                    submediaString: `${subject.lectures.length} lectures`,
                    lectures: subject.lectures.map(lecture => ({
                        ...lecture,
                        identifier: lecture.id,
                        notes: lecture.notes.map(note => note.content)
                    }))
                })
            ),
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
        return {
            ...subject,
            identifier: subject.id,
            submediaString: `${subject.lectures.length} lectures`,
            lectures: subject.lectures.map(lecture => ({
                ...lecture,
                identifier: lecture.id,
                notes: lecture.notes.map(note => note.content)
            }))
        };
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
    try {
        await prisma.subject.create({
            data: {
                ...subject,
                lectures: {
                    create: subject.lectures.map(lecture => ({
                        ...lecture,
                        notes: {
                            create: lecture.notes.map(note => ({
                                content: note
                            }))
                        }
                    }))
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
    console.log("Updating subject with ID:", id);

    // Update lectures first (if provided)
    if(subjectData.lectures) {
        for (const lecture of subjectData.lectures) {
            await UpdateLecture(lecture.identifier, lecture);
        }
    }

    // Update the subject itself
    try {
        await prisma.subject.update({
            where: {
                id: id
            },

            data: {
                ...subjectData,

                // Already updated, can safely ignore now
                lectures: undefined,
            }
        });

        return true;
    }

    catch (error) {
        console.error("Error updating subject: " + error);
        return false;
    }
}