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