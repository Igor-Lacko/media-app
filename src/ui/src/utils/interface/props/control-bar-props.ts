import SortKey from "@shared/enum/sort-key";
import Genre from "@shared/enum/genre";

/**
 * Interface for control bar properties. Has options that are on/off and enable various features.
 */
export interface ControlBarProps {
    title: string;
    filter: boolean;
    sortOptions: SortKey[];
    onSortChange: (sortKey: SortKey) => void;
    onFilterChange: (filterKey: Genre) => void;
    onSearchChange: (searchTerm: string) => void;
    onAddClick: () => void;
}

export default ControlBarProps;