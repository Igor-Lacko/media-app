import { FaTrash } from "react-icons/fa";

/**
 * Button for deleting an item.
 * @param onClick OnClick handler for the button.
 * @param title Title for the button.
 * @param extraClassNames Optional extra class names for styling.
 */
export default function DeleteButton({ onClick, title, extraClassNames } : {
    onClick: () => void;
    title?: string;
    extraClassNames?: string;
}) {
    return (
        <div
            className={"flex items-center p-3 justify-center rounded-lg bg-red-700 dark:bg-red-800 " +
            "hover:bg-red-800 text-gray-200 dark:text-gray-300 cursor-pointer " +
            "transition-colors duration-200 ease-in-out transform hover:scale-105 " + (extraClassNames || "")}
            onClick={onClick}
        >
            <FaTrash className="text-lg" />
            {title && <span className="ml-2">{title}</span>}
        </div>
    );
}