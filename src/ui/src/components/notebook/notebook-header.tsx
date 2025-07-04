import classNames from "classnames";
import { useState } from "react";
import { FaPlus, FaStickyNote, FaCross } from "react-icons/fa";

/**
 * Component containing two buttons for switching between the notebook and the note editor.
 * @param param0 Passed by the parent, switches between the two mentioned components. Additional class names can be passed for styling.
 */
export default function NotebookHeader({onSwitch, extraClassNames} : {onSwitch: () => void, extraClassNames?: string}) {
    // Also here for highlighting buttons
    const [noteListDisplayed, setNoteListDisplayed] = useState(true);

    // When the current tab is not displayed
    const buttonNormalColors = "hover:bg-gray-200 dark:hover:bg-gray-700";

    // When it is (the button also gets disabled)
    const buttonActiveColors = "bg-gray-300 dark:bg-gray-600";

    return (
        <div
            className={"flex justify-start w-full items-center rounded-t-lg " + (extraClassNames || "")}
        >
            <button
                className={classNames(
                    "flex items-center justify-center p-2 w-4/10 text-black dark:text-gray-400 text-lg",
                    {
                        buttonNormalColors: noteListDisplayed,
                        buttonActiveColors: !noteListDisplayed,
                    }
                )}
                onClick={() => {
                    setNoteListDisplayed(false);
                    onSwitch();
                }}
                disabled={!noteListDisplayed}
            >
                <FaPlus
                    className={"mr-3"}
                />
                Add Note
            </button>
            <button
                className={classNames(
                    "flex items-center justify-center p-2 w-4/10 text-black dark:text-gray-400 text-lg",
                    {
                        buttonNormalColors: !noteListDisplayed,
                        buttonActiveColors: noteListDisplayed,
                    }
                )}
                onClick={() => {
                    setNoteListDisplayed(true);
                    onSwitch();
                }}
                disabled={noteListDisplayed}
            >
                <FaStickyNote
                    className={"mr-3"}
                />
                Show notes
            </button>
            <button
                className={"flex items-center justify-center w-2/10 p-2 text-black dark:text-gray-400 text-lg\
                    hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg"}
                onClick={() => {
                    console.log("Close notebook");
                }}
            >
                <FaCross />
            </button>

        </div>
    )
}