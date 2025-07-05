import Note from "@shared/interface/models/note";
import classNames from "classnames";
import { useRef, useState } from "react";

/**
 * Part of the notebook used for, well, adding notes.
 * @param param0 Add handler, current timestamp, and additional class names.
 */
export default function NotebookAddNote({onAdd, timestamp, extraClassNames} : 
    {onAdd: (note: Note) => void, timestamp: React.RefObject<number>, extraClassNames?: string} 
) {
    // Note content, timestamp is provided by the parent component.
    const content = useRef("");

    return (
        <div
            className={"flex flex-col flex-grow items-start justify-center w-full " + (extraClassNames || "")}
        >
            {/** Text area and error text */}
            <div
                className={"flex flex-col flex-1 items-start overflow-y-auto justify-center w-full h-auto py-2 space-y-2"}
            >
                <textarea
                    className={classNames(
                        "w-full flex-1 px-5 outline-none text-black dark:text-gray-400",
                    )}
                    placeholder={"Add note..."}
                    onChange={(e) => {
                        content.current = e.target.value;
                    }}
                    onKeyDown={(e) => {
                        // Newline ok
                        if(e.key === "Enter" && e.shiftKey) {
                            return;
                        }

                        // Else submit
                        else if(e.key === "Enter") {
                            if(content.current.trim() === "") {
                                return;
                            }

                            onAdd({
                                content: content.current,
                                timestamp: timestamp.current
                            })
                        }
                    }}
                />
            </div>
        </div>
    )
}
