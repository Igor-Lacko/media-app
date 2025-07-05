import Note from "@shared/interface/models/note"
import classNames from "classnames";
import { FaCircle, FaTrash } from "react-icons/fa"
import { LengthToTimeVideo } from "utils/adapters/length-to-time";

/**
 * Detail footer for lecture pages. Basically displays a list of notes.
 */
export default function LectureDetailFooter({ notes, updateNotes }: { notes: Note[], updateNotes: (notes: Note[]) => Promise<void> }) {
    return (
            <div
                className={"flex flex-col overflow-x-hidden overflow-y-auto w-full h-full bg-white dark:bg-gray-800"}
            >
                {notes.map((note, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames(
                                "py-4 flex flex-col items-start justify-start w-full h-auto border-b-2 border-gray-200 dark:border-gray-700",
                                {
                                    "bg-gray-100 dark:bg-gray-900": index % 2 === 0,
                                    "bg-white dark:bg-gray-800": index % 2 !== 0
                                }
                            )}
                        >
                            {note.timestamp && (
                                <div className={"flex items-center justify-start w-full mb-2 px-4"}>
                                    <FaCircle className={"text-purple-500 mr-2"} />
                                    {`Timestamp: ${LengthToTimeVideo(note.timestamp)}`}
                                </div>
                            )}
                            <div
                                className={"flex items-center justify-start w-full px-4 mb-2 " + (note.timestamp ? "border-t-2 pt-3 border-gray-200 dark:border-gray-700" : "")}
                            >
                                <span
                                    className={"text-black dark:text-gray-400 text-sm md:text-base lg:text-lg wrap-anywhere"}
                                >
                                    {note.content}
                                </span>
                            </div>
                            {/** Delete note button */}
                            <div
                                className={"flex items-center justify-end w-full mb-2"}
                            >
                                <FaTrash
                                    className={"cursor-pointer text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"}
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