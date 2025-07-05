import classNames from "classnames";
import { useState } from "react";
import { FaPlus, FaStickyNote, FaTimes } from "react-icons/fa";

/**
 * Component containing two buttons for switching between the notebook and the note editor.
 * @param param0 Passed by the parent, switches between the two mentioned components. Additional class names can be passed for styling.
 */
export default function NotebookHeader({onSwitch, noteListDisplayed, extraClassNames} : 
    {onSwitch: () => void, noteListDisplayed: boolean, extraClassNames?: string}) {

    return (
        <div
            className={"flex justify-between w-full items-center " + (extraClassNames || "")}
        >
            <div
                className={"flex items-center justify-start w-2/10 h-full"}
            >
                <button
                    className={classNames(
                        "flex items-center h-full justify-center w-1/2 text-black dark:text-gray-300\
                        text-lg cursor-pointer rounded-tl-lg",
                        {
                            "hover:bg-gray-300 dark:hover-bg-gray-500": noteListDisplayed,
                            "bg-gray-400 dark:bg-gray-600": !noteListDisplayed,
                        }
                    )}
                    onClick={onSwitch}
                    disabled={!noteListDisplayed}
                >
                    <FaPlus
                        className={"mr-3"}
                    />
                    Add Note
                </button>
                <button
                    className={classNames(
                        "flex items-center justify-center h-full w-1/2 text-black dark:text-gray-300 text-lg cursor-pointer",
                        {
                            "hover:bg-gray-300 dark:hover-bg-gray-500": !noteListDisplayed,
                            "bg-gray-400 dark:br-gray-600": noteListDisplayed,
                        }
                    )}
                    onClick={onSwitch}
                    disabled={noteListDisplayed}
                >
                    <FaStickyNote
                        className={"mr-3"}
                    />
                    Notes
                </button>
            </div>
        </div>
    )
}