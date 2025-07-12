import NotebookProps from "utils/props/other/notebook-props";
import classNames from "classnames";
import { useState } from "react";
import NotebookHeader from "./notebook-header";
import NotebookNoteList from "./notebook-note-list";
import NotebookAddNote from "./notebook-add-note";
import Note from "@shared/interface/models/note";

/**
 * Retractable notebook component.
 * @param props Note update handlers, visibility, current timestamp.
 */
export default function Notebook (props: NotebookProps) {
    // Whether to display the note list. If false, displays tye "add note" textfield/area/whatever.
    const [noteListDisplayed, setNoteListDisplayed] = useState(true);

    return (
        <div
            className={classNames(
                "flex-col items-center justify-start w-full h-1/2 dark:bg-gray-800 bg-gray-200 z-50 \
                transition-transform flex duration-300 ease-in-out absolute bottom-0 left-0 rounded-t-lg",
                {
                    "translate-y-full": !props.isVisible,
                    "translate-y-0": props.isVisible,
                }
            )}
        >
            <NotebookHeader
                onSwitch={() => setNoteListDisplayed(!noteListDisplayed)}
                noteListDisplayed={noteListDisplayed}
                extraClassNames={"h-1/10 border-y-1 border-gray-400 dark:border-gray-600"}
            />
            {/** Add note or show notes */}
            {noteListDisplayed ? (
                <NotebookNoteList
                    notes={props.notes}
                    onNoteClick={props.onNoteClick}
                    updateNotes={props.onUpdateNotes}
                />
            ) : (
                <NotebookAddNote
                    onAdd={async (note: Note) => {
                        await props.onAddNote(note);
                        setNoteListDisplayed(true);
                    }}
                    timestamp={props.timestamp}
                />
            )}
        </div>
    )
}