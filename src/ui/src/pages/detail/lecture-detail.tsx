import Lecture from "@shared/interface/models/lecture";
import DeleteData from "data/crud/delete";
import { UpdateVideoUrl, UpdateWatchStatus } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import NotFoundPage from "pages/not-found";
import { useEffect, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail-props";

/**
 * Detail page for lectures.
 */
export default function LectureDetail() {
    const lecture : Lecture | undefined = useFetchById<Lecture>("/api/lectures", "lectureId");

    // State
    const [watchStatus, setWatchStatus] = useState(lecture?.watchStatus);

    // To load on render
    useEffect(() => {
        if (lecture) {
            setWatchStatus(lecture.watchStatus);
        }
    }, [lecture]);

    // 404
    if (!lecture) {
        return <NotFoundPage message="Lecture not found" />;
    }

    const props : DetailProps<Lecture> = {
        model: lecture,
        title: lecture.title!,
        watchStatus: watchStatus,
        hasThumbnail: false,
        hasGenres: false,
        playTitle: "Play Lecture",
        headerType: DetailHeaders.LECTURE,
        editTitle: "Edit Lecture",
        deleteTitle: "Delete Lecture",
        deleteFunction: async () => await DeleteData("/api/lectures", lecture.identifier!),
        setVideoUrlFunction: async (videoUrl: string) => await UpdateVideoUrl<Lecture>("/api/lectures", lecture, videoUrl),
        watchStatusFunction: async (watchStatus: string) => {
            setWatchStatus(watchStatus);
            return await UpdateWatchStatus<Lecture>("/api/lectures", lecture, watchStatus);
        }
    }

    return <DetailLayout<Lecture> {...props} />;
}