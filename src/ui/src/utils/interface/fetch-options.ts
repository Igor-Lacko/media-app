import SortKey from "@shared/enum/sort-key"
import Genre from "@shared/enum/genre";

/**
 * For the useFetch hook
 */
export interface FetchOptions {
    sortBy: SortKey;
    filter: Genre;
    search?: string;
}

export default FetchOptions;