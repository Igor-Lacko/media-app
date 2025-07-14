import useThumbnail from "hooks/use-thumbnail";
import { useNavigate } from "react-router-dom";
import WatchlistProps from "utils/props/lists/watchlist-props";
import classNames from "classnames";
import ProgressBar from "components/other/progress-bar";

/**
 * Returns a watchlist of movies and tv shows that are either currently being watched, or
 * are being planned to be watched in the future.
 */
export default function Watchlist(props: WatchlistProps) {
    // To link to detail pages
    const navigate = useNavigate();

    // To determine which item has a valid thumbnail (unfortunate naming here)
    const validThumbnails = useThumbnail(props.items);

    return (
        <div
            className={"flex flex-col w-full h-auto overflow-y-auto rounded-lg " + (props.extraClassNames || "")}
        >
            {props.items.map((item, index) => (
                <div
                    key={index}
                    className={classNames(
                        "flex w-full rounded-lg items-center transition-colors duration-200 ease-in-out relative p-0 border-2 border-gray-300 dark:border-gray-700",
                        {
                            "bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-700": index % 2 === 0,
                            "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900": index % 2 !== 0,
                            "border-b-0": index < props.items.length - 1,
                        }
                    )}
                >
                    {/** Thumbnail */}
                    {validThumbnails[index] ? (
                        <img
                            src={`file://${item.thumbnailUrl}`}
                            alt={item.title}
                            className={classNames(
                                "w-1/10 h-25 mr-4",
                                {
                                    "rounded-tl-lg": index === 0,
                                    "rounded-bl-lg": index === props.items.length - 1,
                                }
                            )}
                        />
                    ) : (
                        <div
                            className={"w-1/12 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex\
                                items-center justify-center text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 shadow-sm mr-4"}
                        >
                            Thumbnail not found :((
                        </div>
                    )}
                    {/** Title */}
                    <h2
                        className={"text-gray-800 dark:text-gray-400 text-lg font-semibold font-[Roboto] hover:underline cursor-pointer"}
                        onClick={() => navigate(item.url)}
                    >
                        {item.title}
                    </h2>
                    {/** Short description */}
                    {props.showShortDescription && item.shortDescription && (
                        <p className={"text-gray-600 dark:text-gray-400 text-sm mt-1 absolute left-2/5 max-w-2/5 wrap-anywhere line-clamp-4"}>
                            {item.shortDescription}
                        </p>
                    )}
                    {/** Progress, if provided */}
                    {props.showProgressBar && item.progress && (
                        <ProgressBar
                            percentage={item.progressPercentage}
                            label={item.progress}
                            extraClassNames={"absolute right-10"}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}