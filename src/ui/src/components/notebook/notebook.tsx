import NotebookProps from "utils/props/notebook-props";
import classNames from "classnames";
import { useState } from "react";
import NotebookHeader from "./notebook-header";

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
                "flex-col items-center justify-start w-full h-1/2 dark:bg-gray-800 z-50 \
                transition-transform duration-300 ease-in-out absolute bottom-0 left-0",
                {
                    "translate-y-full hidden": !props.isVisible,
                    "translate-y-0 flex": props.isVisible,
                }
            )}
        >
            <NotebookHeader
                onSwitch={() => setNoteListDisplayed(!noteListDisplayed)}
                extraClassNames={"h-1/10"}
            />
            {/** placeholder */}
            <div
                className={"h-9/10 bg-purple-700"}
            >
                To muj je brat
            </div>
        </div>
    )
}