import Lecture from "@shared/interface/models/lecture";
import {
	DBLectureToClient,
	SanitizeClientLectureToDB,
} from "adapters/lectures";
import prisma from "db/db";
import { WatchStatus } from "generated/prisma/enums";

/**
 * Fetches a lecture by its ID.
 * @param id Unique identifier of the lecture.
 * @returns Lecture object if found, null otherwise.
 */
export async function GetLectureById(id: number): Promise<Lecture | null> {
	try {
		const lecture = await prisma.lecture.findUnique({
			where: {
				id: id,
			},

			include: {
				notes: true,
			},
		});
		if (!lecture) {
			return null;
		}

		return DBLectureToClient(lecture);
	} catch (error) {
		return null;
	}
}

/**
 * Create a new lecture for a specific course.
 * @param lecture Lecture object containing details about the lecture.
 * @param courseId Identifier of the course to which the lecture belongs.
 * @returns True if the creation was successful, false otherwise.
 */
export async function CreateLecture(
	lecture: Lecture,
	courseId: number,
): Promise<boolean> {
	const sanitizedLecture = SanitizeClientLectureToDB(lecture);

	try {
		await prisma.lecture.create({
			data: {
				...sanitizedLecture,

				watchStatus:
					sanitizedLecture.continueAt === sanitizedLecture.length &&
					sanitizedLecture.length &&
					sanitizedLecture.length !== 0
						? WatchStatus.COMPLETED
						: sanitizedLecture.watchStatus,

				lectureNumber:
					lecture.lectureNumber === -1
						? (await prisma.lecture.count({
								where: {
									courseId: courseId,
								},
						  })) + 1
						: lecture.lectureNumber,

				course: {
					connect: {
						id: courseId,
					},
				},

				// This will probably always be empty on creation, but just in case?
				notes: {
					create: lecture.notes.map((note) => ({
						content: note.content,
						timestamp: note.timestamp,
					})),
				},
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Update a lecture by its ID.
 * @param id Lecture's unique identifier.
 * @param lecture Partial object containing fields to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateLecture(
	id: number,
	lecture: Partial<Lecture>,
): Promise<boolean> {
	const sanitizedLecture = SanitizeClientLectureToDB(lecture as Lecture);

	try {
		await prisma.lecture.update({
			where: {
				id: id,
			},

			data: {
				...sanitizedLecture,

				// If provided
				notes: sanitizedLecture.notes
					? {
							deleteMany: {},
							create: sanitizedLecture.notes.map((note) => ({
								content: note.content,
								timestamp: note.timestamp,
							})),
					  }
					: undefined,
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Deletes a lecture by its ID.
 * @param id Lecture's unique identifier.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteLecture(id: number): Promise<boolean> {
	try {
		await prisma.lecture.delete({
			where: {
				id: id,
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}
