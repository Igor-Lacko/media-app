import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/controls/control-bar";
import Movie from "@shared/interface/models/movie";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/lists/media-item-list";
import ControlBarProps from "utils/props/control-elements/control-bar-props";
import ListProps from "utils/props/model-elements/list-props";
import LoadingPage from "pages/other/loading-page";

/**
 * App Movie page.
 * Displays a list of Movies with control bar for filtering/sorting.
 */
export default function MoviePage() {
    // Sort/filter/search
    const { filter, setFilter, sort, setSort, search, setSearch } = useFilter();

    // Fetch Movies
    const {data, isLoading} = useQuery({
        queryKey: ["Movies", sort, filter],
        queryFn: async () => await FetchData<Movie>("/api/Movies", { sortBy : sort , filter : filter }),
    })

    const controlBarProps : ControlBarProps = {
        title: "Your Movies",
        filter: true,
        sortOptions: [SortKey.LENGTH, SortKey.NAME, SortKey.RATING],
        onSortChange: (sortKey: SortKey) => {setSort(sortKey)},
        onFilterChange: (filterKey: Genre) => {setFilter(filterKey)},
        onSearchChange: (searchTerm: string) => {setSearch(searchTerm)},
        path: "/movies"
    };

    const MovieListProps : ListProps = {
        // Because refreshing the query on every search change is ehhh
        items: data?.filter((movie : Movie) => movie.title.toLowerCase().includes(search.toLowerCase())) || [],
        showRating: true,
        showThumbnail: true,
        notFoundTitle: "No movies found :((",
        notFoundMessage: "There are no movies that match your search criteria.",
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center p-0 m-0 overflow-y-hidden"}
        >
            <ControlBar {...controlBarProps} />
            <div
                className={"flex flex-col w-full h-full p-4"}
            >
                <MediaItemList
                    {...MovieListProps}
                />
            </div>
        </div>
    );
}