import FileBrowseButton from "components/buttons/file-browse-button";
import RoundedButton from "components/buttons/rounded-button";
import { useState } from "react";

/**
 * Option for file browsing in a form.
 * @param param0 title, onChange handler, and optional extra classnames for styling.
 * @returns React component for file browse option.
 */
export default function FileBrowseOption({
    title,
    initial,
    onChange,
    allowed,
    extraClassnames,
}: {
    title: string;
    initial: string;
    onChange: (value: string | undefined) => void;
    allowed: string;
    extraClassnames?: string;
}) {
    const [filePath, setFilePath] = useState(initial);
    return (
        <div
            className={
                "flex flex-col w-full ml-8 items-start justify-center p-4 space-y-4 " +
                (extraClassnames || "")
            }
        >
            <span
                className={
                    "text-lg flex font-semibold items-center h-full text-gray-800 dark:text-gray-400"
                }
            >
                {title}
            </span>
            <div className={"flex items-center justify-start w-5/10"}>
                <FileBrowseButton
                    initial={filePath}
                    allowed={allowed || "all"}
                    onChange={(value) => {
                        setFilePath(value);
                        onChange(value);
                    }}
                />
                {/** Clear button */}
                <RoundedButton
                    text={"Clear"}
                    extraClassNames={
                        "bg-purple-800 dark:bg-purple-600 text-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500 ml-4"
                    }
                    onClick={() => {
                        setFilePath("");
                        onChange("");
                    }}
                />
            </div>
        </div>
    );
}
