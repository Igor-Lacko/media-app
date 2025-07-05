import Note from "@shared/interface/models/note";
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
                className={"flex flex-col w-full h-full overflow-y-auto space-y-3 p-5 " + (extraClassNames || "")}
            >
                {notes.map((note, index) => {
                    return (
                        <div
                            key={index}
                            className={"flex items-center justify-start w-full h-auto text-black dark:text-gray-400"}
                        >
                            <FaCircle
                                className={"text-purple-500 mr-2 text-sm"}
                            />
                            <span
                                className={"text-sm md:text-base lg:text-lg mr-2"}
                            >
                                {LengthToTimeVideo(note.timestamp || 0) + ":"}
                            </span>
                            <span
                                className={"text-sm md:text-base lg:text-lg"}
                            >
                                {note.content}
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }