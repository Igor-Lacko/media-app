import WatchlistItem from "@shared/interface/watchlist-item";

/**
 * Props for a list of movies/shows/courses to watch or that are currently being watched.
 */
export default interface WatchlistProps {
	// The items themselves
	items: WatchlistItem[];

	// Only for shows (currently watching) and courses (to watch)
	showProgressBar?: boolean;

	// For to watch lists
	showShortDescription?: boolean;

	// Extra styling, ig unused
	extraClassNames?: string;
}
