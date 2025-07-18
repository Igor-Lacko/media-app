import { useEffect, useMemo, useState } from "react";
import { IsValidFile } from "electron/electron-api";
import ImagePathToURL from "utils/adapters/image-path-to-url";

/**
 * Hook that returns a boolean array indicating whether each item has a valid thumbnail.
 * Used for lists containing thubnails multiple times throughout the app.
 * @param items Items to check for valid thumbnails.
 * @returns An array of booleans indicating whether each item's thumbnail is valid.
 */
export default function useThumbnail(
	items: { thumbnailUrl?: string }[],
): { thumbnails: boolean[], setThumbnails: (thumbnails: boolean[]) => void } {
	// Otherwise the useEffect would run in a loop since items is a new reference every time
	const memoizedItems = useMemo(() => items, [items]);

	// State to hold the validity of thumbnails
	const [validThumbnails, setValidThumbnails] = useState<boolean[]>(
		Array(memoizedItems.length).fill(false),
	);

	// Check thumbnails when items change
	useEffect(() => {
		const checkThumbnails = async () => {
			const newValidThumbnails = await Promise.all(
				memoizedItems.map(
					async (item) =>
						item.thumbnailUrl !== undefined && item.thumbnailUrl !== null &&
						(await IsValidFile(item.thumbnailUrl) ||
							(!ImagePathToURL(item.thumbnailUrl).isLocal)),
				),
			);
			setValidThumbnails(newValidThumbnails);
		};
		checkThumbnails();
	}, [memoizedItems]);

	return { thumbnails: validThumbnails, setThumbnails: setValidThumbnails };
}
