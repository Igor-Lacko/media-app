import FileBrowseButton from "components/buttons/file-browse-button";

/**
 * Option for file browsing in a form.
 * @param param0 title, onChange handler, and optional extra classnames for styling.
 * @returns React component for file browse option.
 */
export default function FileBrowseOption({title, initial, onChange, extraClassnames} : {title: string, initial : string, onChange: (value: string) => void, extraClassnames?: string}) {
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
                <FileBrowseButton
                    initial={initial}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}