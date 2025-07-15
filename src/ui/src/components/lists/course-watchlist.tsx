import classNames from "classnames";
import ItemNotFound from "components/other/item-not-found";
import ProgressBar from "components/other/progress-bar";
import { useNavigate } from "react-router-dom";
import WatchlistProps from "utils/props/lists/watchlist-props";

/**
 * Watchlist of courses. Separate from the movie/show watchlist.
 * @param props 
 */
export default function CourseWatchlist(props: WatchlistProps) {
    // Link to detail
    const navigate = useNavigate();

    return (
        <div
            className={"flex flex-col w-full h-auto overflow-y-auto " + (props.extraClassNames || "")}
        >
            {props.items.map((item, index) => (
                <div
                    key={index}
                    className={classNames(
                        "flex w-full h-auto items-center justify-between px-4 py-1 hover:bg-gray-300 dark:hover:bg-gray-700\
                        transition-colors duration-200 ease-in-out bg-gray-200 dark:bg-gray-800\
                        border-gray-300 dark:border-gray-700",
                        {
                            "border-2": index === props.items.length - 1,
                            "border-t-2 border-x-2": index < props.items.length - 1,
                        }
                    )}
                >
                    {/** Just title and progress */}
                    <h1
                        className={"text-lg font-semibold text-black dark:text-gray-400 hover:underline cursor-pointer"}
                        onClick={() => navigate(item.url)}
                    >
                        {item.title}
                    </h1>
                    <ProgressBar
                        percentage={item.progressPercentage}
                        label={item.progress}
                    />
                </div>
            ))}
        </div>
    )
}