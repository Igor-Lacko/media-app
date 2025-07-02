import { useState } from "react"
import { GetFilePath } from "utils/electron-api";

export default function FileBrowseButton({initial, onChange, extensions, extraClassnames} : {
    initial: string,
    onChange: (value: string) => void,
    extensions: string[],
    extraClassnames?: string
}) {
    // To display the currently selected file name
    const [fileName, setFileName] = useState(initial);
    console.log("Extensions: ", extensions);

    return (
        <div
            className={"flex items-center justify-start w-full h-10 rounded-lg\
                border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 " 
                + (extraClassnames || "")}
        >
            <button
                className={"cursor-pointer rounded-lg h-full p-2 items-center justify-center bg-purple-800 dark:bg-purple-600\
                    text-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500 transition-all duration-300 ease-in-out"}
                onClick={async () => {
                    const path = await GetFilePath(extensions);
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
    )
}