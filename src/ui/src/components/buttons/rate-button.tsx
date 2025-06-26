import { FaStar } from "react-icons/fa";

/**
 * RateButton component for rating items.
 * @param param0 OnClick handler and optional extra class names.
 */
export default function RateButton({ onClick, extraClassNames }: { onClick: () => void, extraClassNames?: string; }) {
    return (
        <div
            className={"flex items-center justify-center rounded-lg bg-orange-500 dark:bg-orange-600\
            hover:bg-orange-600 dark:hover:bg-orange-700 text-gray-200 dark:text-gray-100 cursor-pointer\
            transition-colors duration-200 p-3 ease-in-out transform hover:scale-105\
            text-lg " + (extraClassNames || "")}
            onClick={onClick}
        >
            <FaStar
            className={"text-lg"}
            />
            <span className="ml-2">
            Rate
            </span>
        </div>
    )
}