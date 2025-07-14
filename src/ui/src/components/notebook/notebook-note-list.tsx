import Note from "@shared/interface/models/note";
import classNames from "classnames";
import { FaCircle, FaTrash } from "react-icons/fa";
import { LengthToTimeVideo } from "utils/adapters/length-to-time";

/**
 * Part oif the notebook used for displaying notes.
 * @param param0 Notes to display and additional class names.
 */
export default function NotebookNoteList({notes, updateNotes, onNoteClick, extraClassNames} :
    {notes: Note[], extraClassNames?: string, onNoteClick: (timestamp: number) => void, updateNotes: (notes: Note[]) => Promise<void>}) {
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
                                bg-white dark:bg-gray-900 py-3 rounded-lg",
                            )}
                        >
                            {note.timestamp !== undefined && note.timestamp !== null && <div
                                className={"flex items-center justify-start w-full p-3 h-auto text-black dark:text-gray-400"}
                            >
                                <FaCircle
                                    className={"text-purple-500 mr-2 text-sm"}
                                />
                                <span
                                    className={"text-sm md:text-base lg:text-lg mr-2 hover:underline cursor-pointer"}
                                    onClick={() => onNoteClick(note.timestamp!)}
                                >
                                    {`Timestamp: ${LengthToTimeVideo(note.timestamp || 0)}`}
                                </span>
                            </div>}
                            <div
                                className={classNames(
                                    "flex items-center justify-start w-full h-auto text-black p-3 dark:text-gray-400 mt-5",
                                {
                                    "border-t-1 border-gray-200 dark:border-gray-700": note.timestamp
                                })}
                            >
                                <span
                                    className={"text-sm md:text-base wrap-anywhere lg:text-lg"}
                                >
                                    {note.content}
                                </span>
                            </div>
                            <div
                                className={"flex items-center justify-end w-full p-3 mb-2"}
                            >
                                <FaTrash
                                    className={"cursor-pointer mr-3 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"}
                                    onClick={async () => {
                                        const updatedNotes = notes.filter((_, i) => i !== index);
                                        await updateNotes(updatedNotes);
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }