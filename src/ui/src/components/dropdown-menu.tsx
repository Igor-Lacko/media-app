import { useState } from "react";
import DropdownProps from "utils/interface/props/dropdown-props";
import classNames from "classnames";

export default function DropdownMenu(props : DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selection, setSelection] = useState(props.initialValue);

    return (
        <div 
            className={"relative flex flex-col items-center h-full " + props.width}
        >
            <span
                className="flex items-end w-full p-2 text-lg text-gray-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span
                    className="flex items-end w-1/2 p-2 rounded-full cursor-pointer \
                    hover:bg-gray-300 transition-all duration-300 ease-in-out"
                >
                    {props.title}
                    {props.icon}
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
                    className={"flex flex-col p-2"}
                >
                    {props.options.map((option) => (
                        <li
                            key={option.key}
                            className={classNames(
                                "p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-200 text-hray-500",
                                {
                                    "bg-gray-300 dark:bg-gray-200": selection === option.value,
                                }
                            )}
                            onClick={() => {
                                setSelection(option.value);
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