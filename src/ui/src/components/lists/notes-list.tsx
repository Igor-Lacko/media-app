import Note from "@shared/interface/models/note"
import classNames from "classnames";
import ListNotFound from "components/other/item-not-found";
import { FaCircle, FaTrash } from "react-icons/fa"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { LengthToTimeVideo } from "utils/adapters/length-to-time";

/**
 * Detail footer for lecture pages. Basically displays a list of notes.
 */
export default function NotesList({ notes, updateNotes }: { notes: Note[], updateNotes: (notes: Note[]) => Promise<void> }) {
    if (notes.length === 0) {
        return <ListNotFound
            title={"No notes here yet :(("}
            message={"You can add notes by clicking the notebook icon in the video player or the yellow button on this page."}
        />
    }

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
                        {note.timestamp !== undefined && note.timestamp !== null && (
                            <div
                                className={"flex items-center justify-start w-full mb-2 px-4 text-black dark:text-gray-400"}
                            >
                                <FaCircle className={"text-purple-500 mr-2"} />
                                {`Timestamp: ${LengthToTimeVideo(note.timestamp)}`}
                            </div>
                        )}
                        <div
                            className={"flex items-center justify-start w-full px-4 mb-2 "
                                + (note.timestamp ? "border-t-2 pt-3 border-gray-200 dark:border-gray-700" : "")}
                        >
                            <div
                                className={"wrap-anywhere text-black dark:text-gray-400"}
                            >
                                <Markdown
                                    remarkPlugins={[remarkGfm, remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                    components={{
                                        h1: ({ children }) => <h1 className={"font-bold text-lg"}>{children}</h1>,
                                        h2: ({ children }) => <h2 className={"font-bold text-md"}>{children}</h2>,
                                        h3: ({ children }) => <h3 className={"font-bold text-sm"}>{children}</h3>,
                                        h4: ({ children }) => <h4 className={"font-semibold text-xs"}>{children}</h4>,
                                        h5: ({ children }) => <h5 className={"font-semibold text-xs wrap-anywhere"}>{children}</h5>,
                                        h6: ({ children }) => <h6 className={"font-semibold text-xs wrap-anywhere"}>{children}</h6>,
                                        p: ({ children }) => <p className={"text-base wrap-anywhere"}>{children}</p>,
                                    }}
                                >
                                    {note.content}
                                </Markdown>
                            </div>
                        </div>
                        {/** Delete note button */}
                        <div
                            className={"flex items-center justify-end w-full mb-2 px-4"}
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