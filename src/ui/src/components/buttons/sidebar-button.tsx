import { NavLink } from "react-router-dom";
import classNames from "classnames"

import SidebarButtonProps from "utils/interface/sidebar-button-props";

/**
 * @param props icon, label, link
 */
export default function SidebarButton(props : SidebarButtonProps) {
    return (
        <NavLink
            to={props.link}
            className={( { isActive }  : {isActive : boolean}) => 
                classNames (
                    "flex justify-center p-2 space-x-2 m-1 items-center rounded-4xl w-full text-black \
                    dark:text-gray-300 text-lg md:text-base sm:text-sm font-semibold",
                    {
                        // Active
                        "bg-purple-500" : isActive,
                        // Hover
                        "hover:bg-purple-400": !isActive,
                        // Default
                        "bg-white dark:bg-gray-800": !isActive
                    }
                )
            }
        >
            {props.icon}
            <span
                className={"font-normal"}
            >
                {props.label}
            </span>
        </NavLink>
    );
}