import { FaSort } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import ControlBarProps from "utils/props/control-elements/control-bar-props";
import DropdownMenu from "../dropdowns/dropdown-menu";
import SortKey from "@shared/enum/sort-key";
import Genre from "@shared/enum/genre";
import SortKeyAdapter from "utils/adapters/sort-key-adapter";
import GenreAdapter from "utils/adapters/genre-adapter";
import DropdownProps from "utils/props/control-elements/dropdown-props";
import { NavLink } from "react-router-dom";

/**
 * Control bar for filtering/sorting the list of media.
 */
export default function ControlBar(props : ControlBarProps) {
    // Sort and filter texts
    const spanClasses = "flex items-end text-lg p-2 rounded-full text-gray-500\
        cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-400 transition-all duration-300 ease-in-out";
    const dropdownWidth = "w-2/10";

    const sortProps : DropdownProps = {
        width: dropdownWidth,
        prefix: "Sort by",
        icon: <FaSort className={"text-gray-500 h-4 w-4"} />,
        options: props.sortOptions.map((key : SortKey) => {return SortKeyAdapter(key)}),
        onChange: props.onSortChange as (value: SortKey | Genre) => void,
        initialValue: props.initialSort,
        initialText: SortKeyAdapter(props.initialSort).key
    }

    const filterProps : DropdownProps = {
        width: dropdownWidth,
        icon: <FaSort className={"text-gray-500 h-4 w-4"} />,
        options: Object.values(Genre).map((value) => {return GenreAdapter(value)}),
        onChange: props.onFilterChange as (value: SortKey | Genre) => void,
        initialValue: props.initialFilter || Genre.ALL,
        initialText: GenreAdapter(props.initialFilter || Genre.ALL).key,
    }

    return (
        <div
            className={"flex items-center w-full h-1/10 justify-center p-5 border-b-2 border-gray-300 dark:border-gray-700"}
        >
            <span
                className={"text-4xl sm:text-lg md:text-2xl font-semibold h-full w-2/10 text-black dark:text-gray-200 ml-10"}
            >
                {props.title}
            </span>
            <div
                className={"flex w-8/10 h-full items-center space-x-10 justify-end mr-10"}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className={"flex w-2/10 mt-2.5 h-9/10 p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 \
                        dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"}
                    onChange={(e) => props.onSearchChange(e.target.value)}
                />
                <DropdownMenu
                    {...sortProps}
                />
                {props.filter && <DropdownMenu
                    {...filterProps}
                />}
                <NavLink
                    to={props.path + "/add"}
                >
                    <span
                        className={spanClasses}
                    >
                        <FaPlus     
                            className={"text-gray-500 font-light h-4 w-4"}
                        />
                    </span>
                </NavLink>
            </div>
        </div>
    )
}