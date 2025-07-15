import Course from "@shared/interface/models/course";
import DeleteData from "data/crud/delete";
import { ToggleCourseWatchlist } from "data/crud/update";
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

    // The only state!
    const [inWatchlist, setInWatchlist] = useState(course?.toWatch || false);
    useEffect(() => {
        if (course) {
            setInWatchlist(course.toWatch || false);
        }
    }, [course, isLoading]);

    if (isLoading) {
        return <LoadingPage />;
    }

    else if (!course) {
        return <NotFoundPage message="Course not found" />;
    }

    // Props
    const props: DetailProps<Course> = {
        model: course,
        submedia: course.lectures,
        title: course.title!,
        hasThumbnail: false,
        hasGenres: false,
        backUrl: "/courses",
        headerType: DetailHeaders.COURSE,
        listProps: {
            path: "lectures",
            items: course.lectures,
            showRating: false,
            showThumbnail: false,
            notFoundTitle: "No lectures found",
            notFoundMessage: "This course has no lectures yet. You can add one by clicking the 'Add Lecture' button above, or edit the course to add a lecture.",
        },
        inWatchlist: inWatchlist,
        toggleWatchListFunction: async () => {
            setInWatchlist(!inWatchlist);
            return await ToggleCourseWatchlist(course);
        },
        addTitle: "Add Lecture",
        editTitle: "Edit Course",
        deleteTitle: "Delete Course",
        deleteFunction: async () => await DeleteData("/api/courses", course.identifier!),
    }

    return (
        <DetailLayout
            {...props}
        />
    );
}