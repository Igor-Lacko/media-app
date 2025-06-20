import SortKey from "@shared/enum/sort-key";
import Genre from "@shared/enum/genre";

/**
 * Interface for control bar properties. Has options that are on/off and enable various features.
 */
export interface ControlBarProps {
    title: string;
    genre: boolean;
    rating: boolean;
    numberOfEpisodes: boolean;
    numberOfSeasons: boolean;
    length: boolean;
    enableFavorites: boolean;
    onSortChange: (sortKey: SortKey) => void;
    onFilterChange: (filterKey: Genre) => void;
    onSearchChange: (searchTerm: string) => void;
}

export default ControlBarProps;