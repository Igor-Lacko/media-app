/**
 * Interface for a item that can be placed on a watchlist (the plan-to-watch kind, not the wanted criminal kind).
 */
export default interface WatchlistItem {
	// Title
	title: string;

	// Can be "3/5 seasons watched" or "5/12 lectures watched"
	progress?: string;

	// For a progress bar
	progressPercentage?: number;

	// Thumbnail (and if it should have one)
	shouldHaveThumbnail: boolean;
	thumbnailUrl?: string;

	// Short description
	shortDescription?: string;

	// Link to detail page
	url: string;
}
