import WatchStatus from "@shared/enum/watch-status";
import ClientLecture from "@shared/interface/models/lecture";
import { Lecture, Note } from "generated/prisma/client";

export interface DBLecture extends Lecture {
	notes: Note[];
}

export function SanitizeClientLectureToDB(
	lecture: ClientLecture,
): ClientLecture {
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

export function DBLectureToClient(lecture: DBLecture): ClientLecture {
	const { id, ...data } = lecture;
	return {
		...data,
		identifier: id,
		watchStatus: lecture.watchStatus as WatchStatus,
		lastWatchedAt: lecture.lastWatchedAt || undefined,
		videoUrl: lecture.videoUrl || undefined,
		length: lecture.length || undefined,
		notes: lecture.notes.map((note) => {
			return {
				content: note.content,
				timestamp: note.timestamp || undefined,
			};
		}),
	};
}
