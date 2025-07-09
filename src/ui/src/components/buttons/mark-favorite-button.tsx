import classNames from "classnames";
import { FaStar } from "react-icons/fa";

/**
 * Button for marking an item as favorite.
 * @param param0 OnClick handler, favorite status, and optional extra class names.
 */
export default function MarkFavoriteButton({ onClick, isFavorite, extraClassNames } : {
    onClick: () => void;
    isFavorite: boolean;
    extraClassNames?: string;
}) {
    return (
        <div
            className={classNames(
            "flex items-center p-3 justify-center rounded-lg cursor-pointer transition-colors duration-200 ease-in-out transform hover:scale-105",
            {
                "bg-yellow-500 dark:bg-yellow-700 text-gray-200 dark:text-gray-400": isFavorite,
                "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300": !isFavorite,
            }
            )}
            onClick={onClick}
        >
            <FaStar
            className={classNames(
                "text-lg",
                {
                "text-yellow-200": isFavorite,
                "text-gray-400": !isFavorite,
                },
                extraClassNames || ""
            )}
            />
            <span className="ml-2">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
        </div>
    )
}