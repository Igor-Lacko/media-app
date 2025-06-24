import { useState } from "react";
import DropdownProps from "utils/interface/props/dropdown-props";
import classNames from "classnames";
import Genre from "@shared/enum/genre";

export default function DropdownCheckbox(props : DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selections, setSelections] = useState<Genre[]>([]);

    return (
        <div 
            className={"relative flex flex-col items-start h-full " + props.width}
        >
            <span
                className="flex items-end w-full  text-lg text-gray-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-start w-1/2 sm:w-full sm:text-sm sm:p-0 md:text-base lg:text-lg">
                    <div
                        className={"flex items-center rounded-full lg:p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-400\
                            transition-all duration-300 ease-in-out"}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {props.prefix ? `${props.prefix} ${props.initialText}` : // Initial text constant for chexckboxes
                            props.initialText}
                        {props.icon}
                    </div>
                </span>
            </span>
            <div
                className={classNames(
                    "absolute z-10 top-11 w-full left-0  bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700\
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
                            className={"p-2 flex items-center justify-between"}
                        >
                            {option.key}
                            <input
                                type="checkbox"
                                checked={selections.includes(option.value as Genre)}
                                className={"cursor-pointer"}
                                onChange={() => {
                                    selections.includes(option.value as Genre)
                                        ? setSelections(selections.filter((s) => s !== option.value)) :
                                        setSelections([...selections, option.value as Genre]);
                                    props.onChange(option.value);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}