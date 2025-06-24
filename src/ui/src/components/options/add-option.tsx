import { FaPlus } from "react-icons/fa"

/**
 * Option with and add button.
 * @param param0 Title, text near the button, onChange function, extra classnames.
 * @returns Component for adding options.
 */
export default function AddOption({buttonText, onChange, extraClassnames} : {buttonText : string, onChange : () => void, extraClassnames? : string}) {
    return (
        <div
            className={"flex flex-col w-full ml-8 items-start justify-center p-4 space-y-4 " + (extraClassnames || "")}
        >
            <div
                className={"flex rounded-full p-2 items-center justify-center h-full\
                        space-x-2 cursor-pointer transition-all duration-300 ease-in-out\
                        hover:bg-gray-400 dark:hover:bg-gray-200 text-gray-700\
                        dark:text-gray-400"}
                onClick={onChange}
            >
                <FaPlus />
                <span>
                    {buttonText}
                </span>
            </div>
        </div>
    )
}