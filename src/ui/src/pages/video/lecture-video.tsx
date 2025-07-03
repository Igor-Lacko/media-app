import Lecture from "@shared/interface/models/lecture";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";

export default function LectureVideo() {
    const lecture = useFetchById<Lecture>("/api/lectures", "lectureId")!;
    return (
        <VideoPlayerLayout
            title={lecture.title || "Lecture Video"}
            url={lecture.videoUrl || ""}
            onClose={() => window.history.back()}
        />
    );
}