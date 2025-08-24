import CardProps from "utils/props/model-elements/card-props";
import { IsValidFile } from "electron/electron-api";
import { useState, useEffect } from "react";
import ItemNotFound from "components/other/item-not-found";
import { useNavigate } from "react-router-dom";
import CardRating from "components/other/card-rating";
import ImagePathToURL from "utils/adapters/image-path-to-url";

/**
 * Card element displaying a movie or tv show.
 * @param props The model itself, url to it's detail page and extra class names for styling.
 */
export default function MediaItemCard(props: CardProps) {
	// Check if the thumbnail is a valid file
	const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

	useEffect(() => {
		const checkThumbnail = async () => {
			if (props.model.thumbnailUrl) {
				if (
					(await IsValidFile(props.model.thumbnailUrl))
					|| !ImagePathToURL(props.model.thumbnailUrl).isLocal
				) {
					setThumbnailLoaded(true);
				}
			}
		};
		checkThumbnail();
	}, [props.model]);

	// To navigate to detail page
	const navigate = useNavigate();

	return (
		<div
			className={
				"flex flex-col flex-shrink items-center justify-start bg-white dark:bg-gray-800\
                rounded-t-lg shadow-md hover:shadow-2xl transition-shadow duration-200 ease-in-out \
                border-2 border-black dark:border-gray-700 size-80 overflow-hidden"
			}
		>
			{/** Thumbnail */}
			<div
				className={
					"w-full h-1/2 p-0 overflow-hidden rounded-t-lg border-b-2 border-black dark:border-gray-700"
				}
			>
				{thumbnailLoaded ?
					<img
						src={ImagePathToURL(props.model.thumbnailUrl).path}
						alt={props.model.title}
						className={
							"w-full h-full object-fill border-gray-400 dark:border-gray-700"
						}
						onError={() => setThumbnailLoaded(false)}
					/>
				:	<ItemNotFound
						title={"Thumbnail not found :(("}
						message={
							"The thumbnail for this item could does not exist or is not a valid file."
						}
					/>
				}
			</div>
			{/** Rest of the card */}
			<div
				className={
					"flex flex-col items-start justify-start w-full pt-2 h-1/2 \
                        text-black dark:text-gray-400"
				}
			>
				{/** Title, rating */}
				<div
					className={
						"flex items-center justify-between w-full px-4 pb-2 border-b-2 border-black dark:border-gray-700"
					}
				>
					<h2
						className={
							"text-xl font-bold text-center cursor-pointer hover:underline font-[Roboto]"
						}
						onClick={() => navigate(props.url)}
					>
						{props.model.title}
					</h2>
					{props.model.rating && (
						<CardRating rating={props.model.rating} />
					)}
				</div>
				<div
					className={
						"flex flex-col flex-grow items-start justify-between w-full h-auto space-y-2 px-2 pb-2"
					}
				>
					{/** Short description */}
					<p
						className={
							"text-md mt-1 w-full line-clamp-3 text-gray-600 dark:text-gray-300 "
						}
					>
						{props.model.shortDescription
							|| "No description available."}
					</p>
					{/** Type (Movie/Tv show) */}
					<span
						className={
							"text-sm text-gray-500 dark:text-gray-400 italic"
						}
					>
						{props.model.submediaString ? "Tv Show" : "Movie"}
					</span>
				</div>
			</div>
		</div>
	);
}
