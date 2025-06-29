import Lecture from "@shared/interface/models/lecture";
import prisma from "db/db";

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