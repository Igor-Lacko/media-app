import classNames from "classnames";

/**
 * Button used to add a subject/course to a to-watch list.
 * @param param0 OnClick handler, watchlist status, and optional extra class names.
 */
export default function ToggleWatchlistButton({ onClick, isInWatchlist, extraClassNames }: {
    onClick: () => void;
    isInWatchlist: boolean;
    extraClassNames?: string;
}) {
    return (
        <div
            className={classNames(
                "flex items-center p-3 justify-center rounded-lg cursor-pointer transition-colors duration-200 ease-in-out transform hover:scale-105",
                {
                    "bg-purple-500 dark:bg-purple-700 text-gray-200 dark:text-gray-400": isInWatchlist,
                    "bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300": !isInWatchlist,
                },
                extraClassNames || ""
            )}
            onClick={onClick}
        >
            <span className="text-lg">
                {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </span>
        </div>
    )
}
