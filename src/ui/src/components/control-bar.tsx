import { FaSort } from "react-icons/fa";

import ControlBarProps from "utils/interface/control-bar-props";

/**
 * Control bar for filtering/sorting the list of media.
 */
export default function ControlBar(props : ControlBarProps) {
    // Sort and filter texts
    const spanClasses = "flex items-end text-lg p-2 rounded-full text-gray-500\
        cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out";

    // FaSort icons
    const iconClasses = "text-gray-500 h-3 w-3 ml-1";
    return (
        <div
            className={"flex items-center w-full h-1/10 justify-start p-5 border-b-2 border-gray-300 dark:border-gray-700"}
        >
            <span
                className={"text-4xl font-semibold h-full w-2/10 text-black dark:text-gray-200 ml-10"}
            >
                {props.title}
            </span>
            <div
                className={"flex w-8/10 h-full items-center space-x-10 justify-end mr-10"}
            >
                <span
                    className={spanClasses}
                >
                    Sort
                    <FaSort     
                        className={iconClasses}
                    />
                </span>
                <span
                    className={spanClasses}
                >
                    Filter
                    <FaSort     
                        className={iconClasses}
                    />
                </span>
            </div>
        </div>
    )
}