import Lecture from "@shared/interface/models/lecture";
import { UpdateLength, UpdateNotes, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";

/**
 * Lecture video player page.
 */
export default function LectureVideo() {
    const lecture = useFetchById<Lecture>("/api/lectures", "lectureId")!;
    return (
        <VideoPlayerLayout
            title={lecture.title || "Lecture Video"}
            url={lecture.videoUrl || ""}
            saveContinueAt={async (time: number) => {
                await UpdatePlaybackPosition<Lecture>("/api/lectures", lecture, time);
            }}
            saveLength={async (length: number) => {
                await UpdateLength<Lecture>("/api/lectures", lecture, length);
            }}
            addNote={async (time: number, content: string) => {
                await UpdateNotes("/api/lectures", lecture, [...lecture.notes, { content, timestamp: time }]);
            }}
            initialPlaybackTime={lecture.continueAt || 0}
        />
    );
}