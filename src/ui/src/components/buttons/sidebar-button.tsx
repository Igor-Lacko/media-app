import { NavLink } from "react-router-dom";
import classNames from "classnames"

import SidebarButtonProps from "./sidebar-button-props";

/**
 * @param props icon, label, link
 */
export default function SidebarButton(props : SidebarButtonProps) {
    return (
        <NavLink
            to={props.link}
            className={( { isActive }  : {isActive : boolean}) => 
                classNames (
                    "flex justify-center p-2 space-x-2 m-1 items-center rounded-4xl w-full",
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
            <div 
                className="text-black dark:text-gray-300"
            >
                {props.icon}
            </div>
            <span
                className={ "text-black dark:text-gray-300 font-bold text-lg" }
            >
                {props.label}
            </span>
        </NavLink>
    );
}