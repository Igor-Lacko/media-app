import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/controls/control-bar";
import TvShow from "@shared/interface/models/tv-show";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/model-displays/media-item-list";
import ControlBarProps from "utils/props/control-elements/control-bar-props";
import ListProps from "utils/props/model-elements/list-props";
import LoadingPage from "pages/other/loading-page";

/**
 * App TV show page.
 * Displays a list of TV shows with control bar for filtering/sorting.
 */
export default function TvShowPage() {
    // Filtering
    const { filter, setFilter, sort, setSort, search, setSearch } = useFilter();

    // Fetch
    const {data, isLoading} = useQuery({
        queryKey: ["shows", sort, filter],
        queryFn: async () => await FetchData<TvShow>("/api/shows", { sortBy: sort, filter: filter }),
    });

    const controlBarProps : ControlBarProps = {
        title: "Your TV shows",
        filter: true,
        sortOptions: [SortKey.NAME, SortKey.NOF_EPISODES, SortKey.NOF_SEASONS, SortKey.RATING],
        onSortChange: (sortKey: SortKey) => { setSort(sortKey); },
        onFilterChange: (filterKey: Genre) => { setFilter(filterKey); },
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm); },
        path: "/tv-shows"
    }

    const tvShowListProps : ListProps = {
        items: data?.filter((show : TvShow) => show.title.toLowerCase().includes(search.toLowerCase())) || [],
        showRating: true,
        showThumbnail: true,
        notFoundTitle: "No TV shows found :((",
        notFoundMessage: "There are no TV shows that match your search criteria.",
    }

    if (isLoading) {
        return <LoadingPage />;
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