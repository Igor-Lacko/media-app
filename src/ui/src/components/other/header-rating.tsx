import { FaStar } from "react-icons/fa";
import classNames from "classnames";

/**
 * Component to display the rating of a media item with stars.
 * @param param0 Rating value and optional class names for styling.
 */
export default function HeaderRating({ rating, extraClassNames }: { rating: number, extraClassNames?: string }) {
    // Number of filled stars
    const stars: React.ReactNode[] = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
            <FaStar
                key={index}
                className={classNames(
                    "text-2xl",
                    {
                        "text-yellow-500": starValue * 2 <= Math.round(rating),
                        "text-gray-300 dark:text-gray-600": starValue * 2 > Math.round(rating)
                    }
                )}
            />)
    });

    return (
        <div
            className={"flex flex-col items-center justify-center space-y-2 " + (extraClassNames || "")}
        >
            <span
                className={"text-gray-500 dark:text-gray-400 text-xl font-medium italic flex justify-center"}
            >
                {`Rating: ${rating.toFixed(1)} / 10`}
            </span>
            <div
                className={"flex items-center w-full justify-center space-x-1 text-yellow-500"}
            >
                {stars}
            </div>
        </div>
    );
}