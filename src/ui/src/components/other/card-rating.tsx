import { FaStar } from "react-icons/fa";

/**
 * Returns a STAR rating/10 component.
 * @param param0 Rating value and optional class names for styling.
 */
export default function CardRating({ rating, extraClassNames }: { rating: number, extraClassNames?: string }) {
    return (
        <div
            className={"flex items-center justify-center space-x-2" + (extraClassNames || "")}
        >
            <FaStar
                className={"text-yellow-500 text-2xl"}
            />
            <span
                className={"text-gray-500 dark:text-gray-400 text-xl font-medium italic"}
            >
                {`${rating.toFixed(1)} / 10`}
            </span>
        </div>
    )
}
