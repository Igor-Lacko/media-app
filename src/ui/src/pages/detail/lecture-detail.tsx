import Lecture from "@shared/interface/models/lecture";
import Note from "@shared/interface/models/note";
import LectureDetailFooter from "components/lists/lecture-detail-footer";
import DeleteData from "data/crud/delete";
import { UpdateNotes, UpdateVideoUrl, UpdateWatchStatus } from "data/crud/update";
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
    const {model: lecture, isLoading} = useFetchById<Lecture>("/api/lectures", "lectureId");

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

    if (isLoading) {
        return <LoadingPage/>;
    }

    // 404
    else if (!lecture) {
        return <NotFoundPage message="Lecture not found" />;
    }

    const props : DetailProps<Lecture> = {
        model: lecture,
        title: `Lecture ${lecture.lectureNumber}: ${lecture.title}`,
        watchStatus: watchStatus,
        videoUrl: videoUrlRef,
        hasThumbnail: false,
        hasGenres: false,
        playTitle: "Play Lecture",
        headerType: DetailHeaders.LECTURE,
        editTitle: "Edit Lecture",
        deleteTitle: "Delete Lecture",
        deleteFunction: async () => await DeleteData("/api/lectures", lecture.identifier!),
        setVideoUrlFunction: async (videoUrl: string) => {
            videoUrlRef.current = videoUrl;
            return await UpdateVideoUrl<Lecture>("/api/lectures", lecture, videoUrl);
        },
        watchStatusFunction: async (watchStatus: string) => {
            setWatchStatus(watchStatus);
            return await UpdateWatchStatus<Lecture>("/api/lectures", lecture, watchStatus);
        },
        addNoteFunction: async (note: Note) => {
            const updatedNotes = [...notes, note];
            setNotes(updatedNotes);
            return await UpdateNotes("/api/lectures", lecture, updatedNotes);
        }
    }

    return (
        <DetailLayout<Lecture>
            {...props}
        >
            <LectureDetailFooter
                notes={notes}
                updateNotes={async (notes) => {
                    setNotes(notes);
                    await UpdateNotes("/api/lectures", lecture, notes);
                }}
            />
        </DetailLayout>
    )
}