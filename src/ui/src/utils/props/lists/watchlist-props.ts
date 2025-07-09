import WatchlistItem from "@shared/interface/watchlist-item";

/**
 * Props for a list of movies/shows to watch. Probably nothing else?
 */
export default interface WatchlistProps {
    items: WatchlistItem[];
    extraClassNames?: string;
}