import { GetFilePath } from "electron/electron-api";

export default function FileBrowseButton({ initial, onChange, allowed, extraClassnames }: {
    initial: string,
    onChange: (value: string) => void,
    allowed: string,
    extraClassnames?: string
}) {
    return (
        <div
            className={"flex items-center justify-start w-full h-10 rounded-lg\
                border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 "
                + (extraClassnames || "")}
        >
            <button
                className={"cursor-pointer rounded-lg h-full p-2 text-sm items-center justify-center bg-purple-800 dark:bg-purple-600\
                    text-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500 transition-all duration-300 ease-in-out"}
                onClick={async () => {
                    const path = await GetFilePath(allowed);
                    if (path) {
                        onChange(path);
                    }
                }}
            >
                Browse
            </button>
            <span
                className={"ml-2 text-gray-500 dark:text-gray-300 flex justify-start items-center h-full\
                    overflow-hidden whitespace-nowrap text-ellipsis"}
                style={{ direction: "rtl" }}
            >
                {initial || "No file selected"}
            </span>
        </div>
    )
}