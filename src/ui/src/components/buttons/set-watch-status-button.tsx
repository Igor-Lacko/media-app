import { FaCheckCircle } from "react-icons/fa";

// TODO refactor all of these into one component

/**
 * Button for setting the watch status of an item.
 * @param param0 OnClick handler, watch status, and optional extra class names.
 */
export default function SetWatchStatusButton({ onClick} : { onClick: () => void; }) {
    return (
        <div
            className={"flex items-center p-3 justify-center rounded-lg bg-green-500 dark:bg-green-600\
            hover:bg-green-600 dark:hover:bg-green-700 text-gray-200 dark:text-gray-100 cursor-pointer\
            transition-colors duration-200 ease-in-out transform hover:scale-105\
            text-lg"}
            onClick={onClick}
        >
            <FaCheckCircle
                className={"text-lg"}
            />
            <span className="ml-2">
                Set Watch Status
            </span>
        </div>
    );
}