import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/control-bar";
import movie from "@shared/interface/movie";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import FetchData from "data/provider";

/**
 * App movie page.
 * Displays a list of movies with control bar for filtering/sorting.
 */
export default function MoviePage() {
    // Sort/filter/search
    const { filter, setFilter, sort, setSort, search, setSearch } = useFilter();

    // Fetch movies
    const data = useQuery({
        queryKey: ["movies", sort, filter],
        queryFn: async () => await FetchData<movie>("movies", { sortBy : sort , filter : filter })
    })

    const controlBarProps = {
        title: "Your movies",
        genre: true,
        rating: true,
        numberOfEpisodes: false,
        numberOfSeasons: false,
        length: true,
        enableFavorites: true,
        onSortChange: (sortKey: SortKey) => {setSort(sortKey)},
        onFilterChange: (filterKey: Genre) => {setFilter(filterKey)},
        onSearchChange: (searchTerm: string) => {setSearch(searchTerm)}
    };

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center p-0 m-0"}
        >
            <ControlBar {...controlBarProps} />
            <div
                className={"flex flex-col w-full h-full p-4"}
            >

            </div>
        </div>
    );
}