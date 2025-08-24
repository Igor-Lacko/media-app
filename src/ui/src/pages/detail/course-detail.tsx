import { WatchStatus } from "@shared/enum/watch-status";
import Course from "@shared/interface/models/course";
import DeleteData from "data/crud/delete";
import {
	MarkSubmediaAsCompleted,
	ToggleCourseWatchlist,
} from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import { useEffect, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";

export default function CourseDetail() {
	// Course for which the detail is displayed
	const { model: course, isLoading } = useFetchById<Course>("/api/courses");

	// State vars (watchlist, completed lectures)
	const [inWatchlist, setInWatchlist] = useState(course?.toWatch || false);
	const [completedLectures, setCompletedLectures] = useState<boolean[]>(
		course?.lectures.map(
			(lecture) => lecture.watchStatus === WatchStatus.COMPLETED,
		) || [],
	);
	useEffect(() => {
		if (course) {
			setInWatchlist(course.toWatch || false);
			setCompletedLectures(
				course.lectures.map(
					(lecture) => lecture.watchStatus === WatchStatus.COMPLETED,
				),
			);
		}
	}, [course, isLoading]);

	if (isLoading) {
		return <LoadingPage />;
	} else if (!course) {
		return <NotFoundPage message="Course not found" />;
	}

	// Lectures with updated watch status
	const lectures = course.lectures.map((lecture, index) => ({
		...lecture,
		watchStatus:
			completedLectures[index] ?
				WatchStatus.COMPLETED
			:	WatchStatus.NOT_WATCHED,
	}));

	// Props
	const props: DetailProps<Course> = {
		model: course,
		submedia: lectures,
		title: course.title!,
		hasThumbnail: false,
		hasGenres: false,
		backUrl: "/courses",
		headerType: DetailHeaders.COURSE,
		listProps: {
			path: "lectures",
			items: lectures,
			showRating: false,
			showThumbnail: false,
			notFoundTitle: "No lectures found",
			notFoundMessage:
				"This course has no lectures yet. You can add one by clicking the 'Add Lecture' button above, or edit the course to add a lecture.",
		},
		inWatchlist: inWatchlist,
		toggleWatchListFunction: async () => {
			setInWatchlist(!inWatchlist);
			return await ToggleCourseWatchlist(course);
		},
		addTitle: "Add Lecture",
		editTitle: "Edit Course",
		deleteTitle: "Delete Course",
		markSubmediaAsCompletedTitle: "Mark Lectures as Completed",
		completeSubmediaFunction: async (id: number, count: number) => {
			const completed = Array(count)
				.fill(false)
				.concat(Array(course.lectures.length - count).fill(true));
			setCompletedLectures(completed);
			return await MarkSubmediaAsCompleted(
				`/api/courses/${id}/mark-completed`,
				count,
			);
		},
		deleteFunction: async () =>
			await DeleteData("/api/courses", course.identifier!),
	};

	return <DetailLayout {...props} />;
}
