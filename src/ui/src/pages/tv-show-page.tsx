import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/control-bar";
import TvShow from "@shared/interface/models/tv-show";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/provider";
import MediaItemList from "components/media-item-list";
import ControlBarProps from "utils/interface/props/control-bar-props";
import ListProps from "utils/interface/props/list-props";

/**
 * App TV show page.
 * Displays a list of TV shows with control bar for filtering/sorting.
 */
export default function TvShowPage() {
    // Filtering
    const { filter, setFilter, sort, setSort, search, setSearch } = useFilter();

    // Fetch
    const data = useQuery({
        queryKey: ["tv-shows", sort, filter, search],
        queryFn: async () => await FetchData<TvShow>("/api/tv-shows", { sortBy: sort, filter: filter, search: search }),
    });

    const controlBarProps : ControlBarProps = {
        title: "Your TV shows",
        filter: true,
        sortOptions: [SortKey.LENGTH, SortKey.NAME, SortKey.NOF_EPISODES, SortKey.NOF_SEASONS, SortKey.RATING],
        onSortChange: (sortKey: SortKey) => { setSort(sortKey); },
        onFilterChange: (filterKey: Genre) => { setFilter(filterKey); },
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm); },
        onAddClick: () => { console.log("Add TV show clicked"); },
    }

    const tvShowListProps : ListProps = {
        items: data.data || [],
        path: "tv-shows"
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
                    {...tvShowListProps}
                />
            </div>
        </div>
    );
}