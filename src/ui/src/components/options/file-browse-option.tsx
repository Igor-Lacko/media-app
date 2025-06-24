import { useState } from "react"
import { GetFilePath } from "utils/electron-api";

/**
 * Option for file browsing in a form.
 * @param param0 title, onChange handler, and optional extra classnames for styling.
 * @returns React component for file browse option.
 */
export default function FileBrowseOption({title, onChange, extraClassnames} : {title: string, onChange: (value: string) => void, extraClassnames?: string}) {
    // To display the currently selected file name
    const [fileName, setFileName] = useState("");

    return (
        <div
            className={"flex flex-col w-full ml-8 items-start justify-center p-4 space-y-4 " + (extraClassnames || "")}
        >
            <span
                className={"text-lg flex font-semibold items-center h-full text-gray-800 dark:text-gray-400"}
            >
                {title}
            </span>
            <div
                className={"flex items-center justify-start w-4/10"}
            >
                <div
                    className={"flex items-center justify-start w-full h-10 rounded-lg border\
                        border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"}
                >
                    <button
                        className={"cursor-pointer rounded-lg h-full p-2 items-center justify-center bg-purple-800 dark:bg-purple-600\
                            text-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500 transition-all duration-300 ease-in-out"}
                        onClick={async () => {
                            const path = await GetFilePath();
                            if (path) {
                                setFileName(path);
                                onChange(path);
                            }
                        }}
                    >
                        Choose file
                    </button>
                    <span
                        className={"ml-2 text-gray-500 dark:text-gray-300 flex justify-center items-center h-full"}
                    >
                        {fileName || "No file selected"}
                    </span>
                </div>
            </div>
        </div>
    )
}