import Lecture from "@shared/interface/models/lecture";
import Note from "@shared/interface/models/note";
import Notebook from "components/notebook/notebook";
import { UpdateLength, UpdateNotes, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";
import { useEffect, useRef, useState } from "react";

/**
 * Lecture video player page.
 */
export default function LectureVideo() {
    const lecture = useFetchById<Lecture>("/api/lectures", "lectureId")!;

    // For the notebook
    const [notebookVisible, setNotebookVisible] = useState(false);
    const [notes, setNotes] = useState(lecture.notes);
    const timestampRef = useRef<number>(0);

    // To sync with the lecture (don't need to set timestamp, done by the video player)
    useEffect(() => {
        if (lecture) {
            setNotes(lecture.notes);
        }
    }, [lecture]);

    console.log("Lecture: ", lecture);

    return (
        <div
            className={"relative overflow-hidden"}
        >
            <VideoPlayerLayout
                title={`Lecture ${lecture.lectureNumber}: ${lecture.title}`}
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
                notes={notes}
                onClose={() => setNotebookVisible(false)}

                // Note handlers
                onUpdateNotes={async (notes: Note[]) => {
                    if (await UpdateNotes("/api/lectures", lecture, notes)) {
                        setNotes(notes);
                    }
                }}
                onAddNote={async (note: Note)  => {
                    const newNotes = [...notes, note];
                    if (await UpdateNotes("/api/lectures", lecture, newNotes)) {
                        setNotes(newNotes);
                    }
                }}
            />
        </div>
    );
}