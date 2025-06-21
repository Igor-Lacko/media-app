import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/control-bar";
import movie from "@shared/interface/models/movie";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/provider";
import MediaItemList from "components/media-item-list";
import ControlBarProps from "utils/interface/props/control-bar-props";
import ListProps from "utils/interface/props/list-props";

/**
 * App movie page.
 * Displays a list of movies with control bar for filtering/sorting.
 */
export default function MoviePage() {
    // Sort/filter/search
    const { filter, setFilter, sort, setSort, search, setSearch } = useFilter();

    // Fetch movies
    const data = useQuery({
        queryKey: ["movies", sort, filter, search],
        queryFn: async () => await FetchData<movie>("/api/movies", { sortBy : sort , filter : filter, search: search }),
    })

    const controlBarProps : ControlBarProps = {
        title: "Your movies",
        filter: true,
        sortOptions: [SortKey.LENGTH, SortKey.NAME, SortKey.RATING],
        onSortChange: (sortKey: SortKey) => {setSort(sortKey)},
        onFilterChange: (filterKey: Genre) => {setFilter(filterKey)},
        onSearchChange: (searchTerm: string) => {setSearch(searchTerm)},
        onAddClick: () => {console.log("Add movie clicked")},
    };

    const movieListProps : ListProps = {
        items: data.data || [],
        path: "movies"
    }

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center p-0 m-0"}
        >
            <ControlBar {...controlBarProps} />
            <div
                className={"flex flex-col w-full h-full p-4"}
            >
                <MediaItemList
                    {...movieListProps}
                />
            </div>
        </div>
    );
}