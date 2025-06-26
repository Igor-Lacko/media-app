import { FaPencilAlt } from "react-icons/fa";

/**
 * Button for editing an item.
 * @param onClick OnClick handler for the button.
 * @param title Button title.
 * @param extraClassNames Optional extra class names for styling.
 */
export default function EditButton({ onClick, title, extraClassNames } : {
    onClick: () => void;
    title?: string;
    extraClassNames?: string;
}) {
    return (
        <div
            className={"flex items-center p-3 justify-center rounded-lg bg-blue-700 dark:bg-blue-800 " +
            "hover:bg-blue-800 text-gray-200 dark:text-gray-300 cursor-pointer " +
            "transition-colors duration-200 ease-in-out transform hover:scale-105 " + (extraClassNames || "")}
            onClick={onClick}
        >
            <FaPencilAlt className="text-lg" />
            {title && <span className="ml-2">{title}</span>}
        </div>
    );
}