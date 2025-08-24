import WatchStatus from "@shared/enum/watch-status";
import Lecture from "@shared/interface/models/lecture";
import Note from "@shared/interface/models/note";
import Course from "@shared/interface/models/course";
import NotesList from "components/lists/notes-list";
import DeleteData from "data/crud/delete";
import {
	UpdateNotes,
	UpdateVideoUrl,
	UpdateWatchStatus,
} from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import { useEffect, useRef, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";

/**
 * Detail page for lectures.
 */
export default function LectureDetail() {
	const { model: lecture, isLoading: lectureLoading } = useFetchById<Lecture>(
		"/api/lectures",
		"lectureId",
	);

	// Course for URL
	const { model: course, isLoading: courseLoading } =
		useFetchById<Course>("/api/courses");

	// State
	const [watchStatus, setWatchStatus] = useState(lecture?.watchStatus);
	const [notes, setNotes] = useState<Note[]>(lecture?.notes || []);

	// Ref
	const videoUrlRef = useRef(lecture?.videoUrl || "");

	// Update state on data load
	useEffect(() => {
		if (lecture) {
			setWatchStatus(lecture.watchStatus);
			setNotes(lecture.notes || []);
			videoUrlRef.current = lecture.videoUrl || "";
		}
	}, [lecture]);

	if (lectureLoading || courseLoading) {
		return <LoadingPage />;
	}

	// 404
	else if (!lecture || !course) {
		return <NotFoundPage message="Lecture not found" />;
	}

	const props: DetailProps<Lecture> = {
		model: lecture,
		title: `Lecture ${lecture.lectureNumber}: ${lecture.title}`,
		watchStatus: watchStatus,
		videoUrl: videoUrlRef,
		hasThumbnail: false,
		hasGenres: false,
		playTitle: "Play Lecture",
		headerType: DetailHeaders.LECTURE,
		watchStatusOptions: [WatchStatus.NOT_WATCHED, WatchStatus.COMPLETED],
		editTitle: "Edit Lecture",
		deleteTitle: "Delete Lecture",
		backUrl: `/courses/${course.identifier}`,
		deleteFunction: async () =>
			await DeleteData("/api/lectures", lecture.identifier!),
		setVideoUrlFunction: async (videoUrl: string) => {
			videoUrlRef.current = videoUrl;
			return await UpdateVideoUrl<Lecture>(
				"/api/lectures",
				lecture,
				videoUrl,
			);
		},
		watchStatusFunction: async (watchStatus: string) => {
			setWatchStatus(watchStatus);
			return await UpdateWatchStatus<Lecture>(
				"/api/lectures",
				lecture,
				watchStatus,
			);
		},
		addNoteFunction: async (note: Note) => {
			const updatedNotes = [...notes, note];
			setNotes(updatedNotes);
			return await UpdateNotes("/api/lectures", lecture, updatedNotes);
		},
	};

	return (
		<DetailLayout<Lecture> {...props}>
			<NotesList
				notes={notes}
				updateNotes={async (notes) => {
					setNotes(notes);
					await UpdateNotes("/api/lectures", lecture, notes);
				}}
			/>
		</DetailLayout>
	);
}
