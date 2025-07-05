import Lecture from "@shared/interface/models/lecture";
import Note from "@shared/interface/models/note";
import Notebook from "components/notebook/notebook";
import { UpdateLength, UpdateNotes, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";
import { useRef, useState } from "react";

/**
 * Lecture video player page.
 */
export default function LectureVideo() {
    const lecture = useFetchById<Lecture>("/api/lectures", "lectureId")!;

    // For the notebook
    const [notebookVisible, setNotebookVisible] = useState(false);
    const timestampRef = useRef<number>(0);

    console.log("Lecture: ", lecture);

    return (
        <div
            className={"relative overflow-hidden"}
        >
            <VideoPlayerLayout
                title={lecture.title || "Lecture Video"}
                url={lecture.videoUrl || ""}
                saveContinueAt={async (time: number) => {
                    await UpdatePlaybackPosition<Lecture>("/api/lectures", lecture, time);
                }}
                saveLength={async (length: number) => {
                    await UpdateLength<Lecture>("/api/lectures", lecture, length);
                }}
                onNoteClick={() => {
                    setNotebookVisible(!notebookVisible);
                }}
                initialPlaybackTime={lecture.continueAt || 0}
                timestampRef={timestampRef}
            />
            <Notebook
                isVisible={notebookVisible}
                timestamp={timestampRef}
                notes={lecture.notes}
                onClose={() => setNotebookVisible(false)}
                onUpdateNotes={async (notes: Note[]) => await UpdateNotes("/api/lectures", lecture, notes)}
            />
        </div>
    );
}