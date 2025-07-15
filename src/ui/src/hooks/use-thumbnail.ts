import { useCallback, useEffect, useMemo, useState } from "react";
import { IsValidFile } from "electron/electron-api";

/**
 * Hook that returns a boolean array indicating whether each item has a valid thumbnail.
 * Used for lists containing thubnails multiple times throughout the app.
 * @param items Items to check for valid thumbnails.
 * @returns An array of booleans indicating whether each item's thumbnail is valid.
 */
export default function useThumbnail(
	items: { thumbnailUrl?: string }[],
): boolean[] {
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
						item.thumbnailUrl !== undefined &&
						(await IsValidFile(item.thumbnailUrl)),
				),
			);
			setValidThumbnails(newValidThumbnails);
		};
		checkThumbnails();
	}, [memoizedItems]);

	return validThumbnails;
}
