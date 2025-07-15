import { useState } from "react";
import DropdownProps from "utils/props/control-elements/dropdown-props";
import classNames from "classnames";

export default function DropdownMenu(props: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={"relative flex flex-col items-start h-full " + props.width}
        >
            <span
                className="flex items-end w-full p-2 text-lg text-gray-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-end w-1/2 p-2 sm:w-full sm:text-sm sm:p-0 md:text-base lg:text-lg">
                    <div
                        className={"flex items-center rounded-full lg:p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-400\
                            transition-all duration-300 ease-in-out"}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {props.prefix ? `${props.prefix} ${props.initialText}` :
                            props.initialText}
                        {props.icon}
                    </div>
                </span>
            </span>
            <div
                className={classNames(
                    "absolute z-10 top-full w-full left-0  bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700\
                    rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform origin-top",
                    {
                        "scale-y-0": !isOpen,
                        "scale-y-100": isOpen
                    }
                )}
            >
                <ul
                    className={"flex flex-col p-2 max-h-60 overflow-y-auto text-gray-700 dark:text-gray-400"}
                >
                    {props.options.map((option) => (
                        <li
                            key={option.key}
                            className={classNames(
                                "p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 text-hray-500",
                                {
                                    "bg-gray-300 dark:bg-gray-200": props.initialValue === option.value,
                                }
                            )}
                            onClick={() => {
                                props.onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.key}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}