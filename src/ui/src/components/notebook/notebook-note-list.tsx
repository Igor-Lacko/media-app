import Note from "@shared/interface/models/note";
import classNames from "classnames";
import { FaCircle } from "react-icons/fa";
import { LengthToTimeVideo } from "utils/adapters/length-to-time";

/**
 * Part oif the notebook used for displaying notes.
 * @param param0 Notes to display and additional class names.
 */
export default function NotebookNoteList({notes, extraClassNames} :
    {notes: Note[], extraClassNames?: string}) {
        return (
            <div
                className={"flex flex-col w-full h-full overflow-y-auto overlfow-x-hidden space-y-3 p-5 " + (extraClassNames || "")}
            >
                {notes.map((note, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames(
                                "flex flex-col items-start justify-start w-full h-auto text-black dark:text-gray-400 \
                                bg-white dark:bg-gray-900 p-3 rounded-lg",
                            )}
                        >
                            <div
                                className={"flex items-center justify-start w-full h-auto text-black dark:text-gray-400"}
                            >
                                <FaCircle
                                    className={"text-purple-500 mr-2 text-sm"}
                                />
                                <span
                                    className={"text-sm md:text-base lg:text-lg mr-2"}
                                >
                                    {`Timestamp: ${LengthToTimeVideo(note.timestamp || 0)}`}
                                </span>
                            </div>
                            <span
                                className={"text-sm md:text-base mt-5 wrap-anywhere lg:text-lg"}
                            >
                                {note.content}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }