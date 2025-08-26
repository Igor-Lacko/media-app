import ItemNotFound from "components/other/item-not-found";
import { useState } from "react";
import ImagePathToURL from "utils/adapters/image-path-to-url";

export default function DetailImage({
	src,
	classNames,
}: {
	src: string;
	classNames?: string;
}) {
	// Return a placeholder div on error
	const [thumbnailLoaded, setThumbnailLoaded] = useState(true);

	return thumbnailLoaded ?
			<img
				src={ImagePathToURL(src).path}
				alt="Detail"
				onError={() => setThumbnailLoaded(false)}
				className={
					"h-128 w-100 ml-10 border-2 border-black dark:border-gray-700 rounded-lg\
                overflow-hidden shadow-lg object-fill " + (classNames || "")
				}
			/>
		:	<ItemNotFound
				title={"Thumbnail not found :(("}
				message={
					"The thumbnail for this item does not exist or is not a valid file."
				}
				extraClassNames={
					"rounded-lg h-128 w-100 shadow-md ml-10 border-2 border-black dark:border-gray-700"
				}
			/>;
}
