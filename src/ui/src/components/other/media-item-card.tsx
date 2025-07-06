import CardProps from "utils/props/model-elements/card-props";
import { IsValidFile } from "utils/electron-api";
import { useState, useEffect } from "react";
import ItemNotFound from "components/not-found/item-not-found";
import { useNavigate } from "react-router-dom";
import HeaderRating from "./header-rating";

/**
 * Card element displaying a movie or tv show.
 * @param props The model itself, url to it's detail page and extra class names for styling.
 */
export default function MediaItemCard(props: CardProps) {
    // Check if the thumbnail is a valid file
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    if (props.model.thumbnailUrl) {
        IsValidFile(props.model.thumbnailUrl)
            .then((isValid) => {
                if (isValid) {
                    setThumbnailLoaded(true);
                }
            });
    }

    // To navigate to detail page
    const navigate = useNavigate();

    return (
        <div
            className={"flex flex-col items-center justify-start bg-gray-200 dark:bg-gray-800\
                rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out \
                " + (props.extraClassNames || "")}
        >
            {/** Thumbnail */}
            <div
                className={"w-full h-1/2 rounded-t-lg overflow-hidden"}
            >
                {thumbnailLoaded ? (
                    <img
                        src={props.model.thumbnailUrl}
                        alt={props.model.title}
                        className={"w-full h-full object-fit"}
                    />
                ) : (
                    <ItemNotFound
                        title={"Thumbnail not found :(("}
                        message={"The thumbnail for this item could does not exist or is not a valid file."}
                    />
                )}
            </div>
            {/** Rest of the card */}
            <div
                className={"flex flex-col items-start justify-start w-full py-2 space-y-2 h-1/2 \
                        text-black dark:text-gray-400"}
            >
                {/** Title, rating */}
                <div
                    className={"flex items-center justify-between w-full px-2"}
                >
                    <h2
                        className={"text-xl font-bold text-center cursor-pointer hover:underline"}
                        onClick={() => navigate(props.url)}
                    >
                        {props.model.title}
                    </h2>
                    {props.model.rating && <HeaderRating
                        rating={props.model.rating}
                        
                    />}
                </div>
                {/** Short description */}
                <p
                    className={"text-md p-2 w-full text-center text-gray-600 dark:text-gray-300"}
                >
                    {props.model.shortDescription || "No description available."}
                </p>
                {/** Type (Movie/Tv show) */}
                <span
                    className={"text-sm text-gray-500 dark:text-gray-400 italic"}
                >
                    {props.model.submediaString ? "Tv Show" : "Movie"}
                </span>
            </div>
        </div>
    )
}