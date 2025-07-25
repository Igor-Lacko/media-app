import { NavLink, useLocation } from "react-router-dom";
import ListProps from "utils/props/lists/list-props";
import GenreAdapter from "utils/adapters/genre-adapter";
import watchStatusAdapter from "utils/adapters/watch-status-adapter";
import Genre from "@shared/enum/genre";
import { FaStar } from "react-icons/fa";
import classNames from "classnames";
import WatchStatus from "@shared/enum/watch-status";
import ItemNotFound from "components/other/item-not-found";
import useThumbnail from "hooks/use-thumbnail";
import ImagePathToURL from "utils/adapters/image-path-to-url";

/**
 * List of media items with links to their pages.
 * Inspired by MyAnimeList.
 */
export default function MediaItemList(props: ListProps) {
    // Current URL
    const location = useLocation();

    // Get valid thumbnails
    const { thumbnails: validThumbnails, setThumbnails } = useThumbnail(props.items);

    if (props.items.length === 0) {
        return <ItemNotFound
            title={props.notFoundTitle || "No items found"}
            message={props.notFoundMessage || "There are no items to display."}
        />
    }

    return (
        <div className={"flex flex-col items-center w-full overflow-y-auto"}>
            {props.items.map((item, index) => (
                <NavLink
                    key={item.identifier}
                    to={`${location.pathname}/${item.identifier}`}
                    className={classNames(
                        "flex w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 justify-between items-center",
                        {
                            "bg-gray-200 dark:bg-gray-900": index % 2 === 0,
                            "bg-white dark:bg-gray-800": index % 2 !== 0,
                            "border-b-2 border-gray-300 dark:border-gray-700": index < props.items.length - 1,
                        }
                    )}
                >
                    {props.showThumbnail && (validThumbnails[index] ? (
                        <img
                            src={ImagePathToURL(item.thumbnailUrl).path}
                            onError={() => {
                                const newThumbnails = [...validThumbnails];
                                newThumbnails[index] = false;
                                setThumbnails(newThumbnails);
                            }}
                            alt={item.title}
                            className={"size-32 rounded-lg object-fit"}
                        />
                    ) : (
                        <div
                            className={"size-32 rounded-lg bg-gray-200 dark:bg-gray-700\
                                    flex items-center justify-center text-xs text-gray-500 dark:text-gray-400\
                                    border border-gray-300 dark:border-gray-600 shadow-sm"}
                        >
                            Thumbnail not found :((
                        </div>
                    )
                    )}
                    <div
                        className={classNames(
                            "flex ml-3 flex-col h-full items-start justify-start w-3/9",
                        )}
                    >
                        <h3
                            className={"text-lg font-semibold text-gray-900 dark:text-gray-400"}>
                            {item.title}
                        </h3>
                        {item.shortDescription && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 h-16 line-clamp-3 max-w-8/9">
                                {item.shortDescription}
                            </p>
                        )}
                    </div>
                    <div
                        className={"flex h-full w-1/10 items-center justify-center"}
                    >
                        {item.genres && (
                            <span
                                className={"text-md text-gray-500 dark:text-gray-300"}
                            >
                                {item.genres.filter((genre) => (genre !== Genre.ALL)).map((genre) => (GenreAdapter(genre).key)).join(", ")}
                            </span>
                        )}
                    </div>
                    <div
                        className={"flex flex-col h-full w-1/10 items-center justify-center"}
                    >
                        {props.showRating && <span className={"text-lg text-yellow-500"}>
                            {item.rating !== null && item.rating !== undefined ? item.rating.toFixed(1) : "N/A"} <FaStar className="inline" />
                        </span>}
                    </div>
                    {item.watchStatus && <span
                        className={classNames(
                            "flex items-center justify-center w-2/10 h-full text-md",
                            {
                                "text-green-500": item.watchStatus === WatchStatus.COMPLETED,
                                "text-blue-500": item.watchStatus === WatchStatus.WATCHING,
                                "text-gray-500": item.watchStatus === WatchStatus.NOT_WATCHED,
                                "text-yellow-500": item.watchStatus === WatchStatus.PLAN_TO_WATCH,
                            }
                        )}
                    >
                        {watchStatusAdapter(item.watchStatus)}
                    </span>}
                    <div
                        className={"flex items-center justify-center w-2/10 h-full text-md"}
                    >
                        {item.submediaString && (
                            <span className={"text-gray-500 dark:text-gray-300"}>
                                {item.submediaString}
                            </span>
                        )}
                    </div>
                </NavLink>
            ))}
        </div>
    )
}