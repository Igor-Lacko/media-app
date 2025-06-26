import { FaPlus } from "react-icons/fa";

/**
 * Button for adding a new item.
 * @param onClick OnClick handler for the button.
 * @param extraClassNames Optional extra class names for styling.
 */
export default function AddButton({ onClick, title, extraClassNames } : {
    onClick: () => void;
    title?: string;
    extraClassNames?: string;
}) {
    return (
        <div
            className={"flex items-center p-3 justify-center rounded-lg bg-green-500 dark:bg-green-700 " +
            "hover:bg-green-600 text-gray-200 dark:text-gray-400 cursor-pointer " +
            "transition-colors duration-200 ease-in-out transform hover:scale-105 " + (extraClassNames || "")}
            onClick={onClick}
        >
            <FaPlus className="text-lg" />
            <span className="ml-2">{title}</span>
        </div>
    );
}