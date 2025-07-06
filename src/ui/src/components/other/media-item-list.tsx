import { NavLink, useLocation } from "react-router-dom";
import ListProps from "utils/props/model-elements/list-props";
import GenreAdapter from "utils/adapters/genre-adapter";
import watchStatusAdapter from "utils/adapters/watch-status-adapter";
import Genre from "@shared/enum/genre";
import { FaStar } from "react-icons/fa";
import classNames from "classnames";
import WatchStatus from "@shared/enum/watch-status";
import ListNotFound from "components/not-found/item-not-found";

/**
 * List of media items with links to their pages.
 * Inspired by MyAnimeList.
 */
export default function MediaItemList(props: ListProps) {
    // Current URL
    const location = useLocation();

    if (props.items.length === 0) {
        return <ListNotFound
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
                        "flex w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200",
                        {
                            "bg-gray-200 dark:bg-gray-900": index % 2 === 0,
                            "bg-white dark:bg-gray-800": index % 2 !== 0,
                            "border-b-2 border-gray-300 dark:border-gray-700": index < props.items.length - 1
                        }
                    )}
                >
                    {props.showThumbnail && item.thumbnailUrl && <img
                        src={`local://${item.thumbnailUrl}`}
                        alt={item.title}
                        className={"w-1/12 max-h-full rounded-lg"}
                    />}
                    {props.showThumbnail && !item.thumbnailUrl && <div
                        className={"w-1/12 max-h-full rounded-lg"}
                    />}
                    <div
                        className={classNames(
                            "flex ml-3 flex-col h-full items-start justify-start",
                            {
                                "w-1/9": props.showThumbnail,
                                "w-3/9": !props.showThumbnail
                            }
                        )}
                    >
                        <h3 
                            className={"text-lg font-semibold text-gray-900 dark:text-gray-400"}>
                            {item.title}
                        </h3>
                        {item.shortDescription && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.shortDescription}
                            </p>
                        )}
                        {item.submediaString && (
                            <span className="text-sm text-gray-500 dark:text-gray-300">
                                {item.submediaString}
                            </span>
                        )}
                    </div>
                    <div
                        className={"flex h-full w-2/10 items-center justify-center"}
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
                        className={"flex flex-col h-full w-2/10 items-center justify-center"}
                    >
                        {props.showRating && <span className={"text-lg text-yellow-500"}>
                            {item.rating ? item.rating.toFixed(1) : "N/A"} <FaStar className="inline" />
                        </span>}
                    </div>
                    <span
                        className={classNames(
                            "flex items-center justify-center w-2/10 h-full text-md",
                            {
                                "text-green-500": item.watchStatus === WatchStatus.WATCHED,
                                "text-blue-500": item.watchStatus === WatchStatus.WATCHING,
                                "text-gray-500": item.watchStatus === WatchStatus.UNWATCHED
                            }
                        )}
                    >
                        {watchStatusAdapter(item.watchStatus)}
                    </span>
                </NavLink>
            ))}
        </div>
    )
}