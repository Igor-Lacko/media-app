import prisma from "db/db";
import Course from "@shared/interface/models/course";
import { CreateLecture, UpdateLecture } from "./lecture-controller";
import Lecture from "@shared/interface/models/lecture";
import { DBCourseToClient, SanitizeClientCourseToDB } from "adapters/courses";
import { SanitizeClientLectureToDB } from "adapters/lectures";
import Note from "@shared/interface/models/note";
import { WatchStatus } from "generated/prisma/enums";

/**
 * Gets all courses matching the given parameters.
 * @returns List of courses matching the parameters.
 */
export async function GetCourses(): Promise<Course[]> {
	try {
		const courses = await prisma.course.findMany({
			include: {
				lectures: {
					include: {
						notes: true,
					},
				},
			},
		});

		return courses.map((course): Course => DBCourseToClient(course));
	} catch (error) {
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
				id: id,
			},

			include: {
				lectures: {
					include: {
						notes: true,
					},
				},
			},
		});

		if (!course) {
			return null;
		}

		// Map lectures and notes
		return DBCourseToClient(course);
	} catch (error) {
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
					create: course.lectures.map((lecture: Lecture) => {
						const sanitizedLecture =
							SanitizeClientLectureToDB(lecture);
						return {
							...sanitizedLecture,
							notes: {
								create: lecture.notes.map((note: Note) => ({
									content: note.content,
								})),
							},
						};
					}),
				},
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Updates a course by its ID.
 * @param id Identifier of the course to update.
 * @param CourseData Partial object containing fields to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateCourse(
	id: number,
	CourseData: Partial<Course>,
): Promise<boolean> {
	const sanitizedCourse = SanitizeClientCourseToDB(CourseData as Course);

	// Update lectures first (if provided)
	if (sanitizedCourse.lectures) {
		for (const lecture of sanitizedCourse.lectures) {
			lecture.identifier
				? await UpdateLecture(lecture.identifier, lecture)
				: await CreateLecture(lecture, id);
		}
	}

	// Update the Course itself
	try {
		await prisma.course.update({
			where: {
				id: id,
			},

			data: {
				...sanitizedCourse,

				// Delete lectures not present in the update, or ignore if lectures object not passed
				lectures: sanitizedCourse.lectures
					? {
							deleteMany: {
								id: {
									notIn: sanitizedCourse.lectures
										.filter(
											(lecture: Lecture) =>
												lecture.identifier !==
												undefined,
										)
										.map(
											(lecture: Lecture) =>
												lecture.identifier!,
										),
								},
							},
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
 * Marks the first `count` lectures of a course as completed.
 * @note Sets the watch status of the lectures outside the range to NOT_WATCHED.
 * @param id The ID of the course.
 * @param count The number of lectures to mark as completed.
 * @returns True if the operation was successful, false otherwise.
 */
export async function MarkLecturesAsCompleted(
	id: number,
	count: number,
): Promise<boolean> {
	try {
		// Complete the lectures <= count
		await prisma.lecture.updateMany({
			where: {
				courseId: id,
				lectureNumber: {
					lte: count,
				}
			},

			data: {
				watchStatus: WatchStatus.NOT_WATCHED,
			}
		}).catch(() => {
			return false;
		});

		// Others to NOT_WATCHED
		await prisma.lecture.updateMany({
			where: {
				courseId: id,
				lectureNumber: {
					gt: count,
				}
			},

			data: {
				watchStatus: WatchStatus.NOT_WATCHED,
			}
		}).catch(() => {
			return false;
		});

		return true;
	} catch (error) {
		return false;
	}
}
/**
 * Deletes a course by its ID.
 * @param id Identifier of the course to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteCourse(id: number): Promise<boolean> {
	// Lectures deleted by cascade
	try {
		await prisma.course.delete({
			where: {
				id: id,
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}
