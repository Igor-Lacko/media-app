/**
 * Form/settings option component for input fields.
 * @param param title, placeholder, onChange, extraClassnames (optional)
 * @returns React component for input option
 */
export default function InputOption({ title, placeholder, onChange, extraClassnames }: { title: string, placeholder: string, onChange: (value: string) => void, extraClassnames?: string }) {
    return (
        <div
            className={"flex flex-col w-full items-start justify-center p-4 space-y-4 " + (extraClassnames || "")}
        >
            <span
                className={"text-lg flex font-semibold items-center h-full text-gray-700 dark:text-gray-400"}
            >
                {title}
            </span>
            <div
                className={"flex mr-10 items-center justify-center h-full"}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    className={"w-full h-10 p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none\
                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 ease-in-out"}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        </div>
    )
}