import useThumbnail from "hooks/use-thumbnail";
import { useNavigate } from "react-router-dom";
import WatchlistProps from "utils/props/lists/watchlist-props";
import ItemNotFound from "components/other/item-not-found";
import classNames from "classnames";
import ProgressBar from "components/other/progress-bar";

/**
 * Returns a watchlist of movies and tv shows.
 */
export default function ToWatchList(props: WatchlistProps) {
    // To link to detail pages
    const navigate = useNavigate();

    // To determine which item has a valid thumbnail (unfortunate naming here)
    const validThumbnails = useThumbnail(props.items);

    // Items 404
    if (props.items.length === 0) {
        return <ItemNotFound
            title={"Watchlist is empty :(("}
            message={"You have no movies or shows to watch. Add some by setting their watch status to 'Plan to watch'"}
        />
    }

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
                            "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700": index % 2 === 0,
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
                        className={"text-gray-800 dark:text-gray-200 text-lg font-semibold font-[Roboto] hover:underline cursor-pointer"}
                        onClick={() => navigate(item.url)}
                    >
                        {item.title}
                    </h2>
                    {/** Short description */}
                    {item.shortDescription && (
                        <p className={"text-gray-600 dark:text-gray-400 text-sm mt-1 absolute left-2/5"}>
                            {item.shortDescription}
                        </p>
                    )}
                    {/** Progress, if provided */}
                    {item.progress && (
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