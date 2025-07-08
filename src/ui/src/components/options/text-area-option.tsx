/**
 * Form option component wioth a text area (e.g. for short descriptions).
 * @param param0 Title, onChange handler, placeholder text, and optional extra classnames.
 * @returns React component for text area option.
 */
export default function TextAreaOption({
    title,
    initial,
    onChange,
    extraClassnames
}: {
    title: string;
    initial: string;
    onChange: (value: string) => void;
    extraClassnames?: string;
}) {
    return (
        <div className={"flex flex-col w-full ml-8 space-y-3 items-start justify-center p-4 " + (extraClassnames || "")}>
            <span
                className={"text-lg mb-5 flex font-semibold items-center h-1/5 text-gray-700 dark:text-gray-400"}
            >
                {title}
            </span>
            <textarea
                className={"w-full h-4/5 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-gray-400 \
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 ease-in-out\
                "}
                onChange={(e) => onChange(e.target.value)}
                defaultValue={initial}
                placeholder={"..."}
            />
        </div>
    )
}