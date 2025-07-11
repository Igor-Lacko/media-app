import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/controls/control-bar";
import Movie from "@shared/interface/models/movie";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/lists/media-item-list";
import ControlBarProps from "utils/props/control-elements/control-bar-props";
import ListProps from "utils/props/lists/list-props";
import LoadingPage from "pages/other/loading-page";
import { SortMedia } from "utils/other/sort-media";
import SettingsContext from "context/settings-context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * App Movie page.
 * Displays a list of Movies with control bar for filtering/sorting.
 */
export default function MoviePage() {
    // Sort/filter/search
    const { filter, setFilter, sort, setSort, search, setSearch, ascending, setAscending } = useFilter();

    // Settings (for hasApiKey)
    const { settings } = useContext(SettingsContext);

    // Modal to add normally or from API
    const [addModalVisible, setAddModalVisible] = useState(false);

    // To navigate
    const navigate = useNavigate();

    // Fetch Movies
    const { data, isLoading } = useQuery({
        queryKey: ["Movies"],
        queryFn: async () => await FetchData<Movie>("/api/movies"),
    })

    const controlBarProps: ControlBarProps = {
        title: "Your Movies",
        filter: true,
        sortOptions: [SortKey.LENGTH, SortKey.NAME, SortKey.RATING],
        onSortChange: (sortKey: SortKey) => { setSort(sortKey) },
        onFilterChange: (filterKey: Genre) => { setFilter(filterKey) },
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm) },
        initialSort: sort,
        initialFilter: filter,
        initialSortOrder: ascending,
        onSortOrderChange: (asc: boolean) => { setAscending(asc) },
        onAddClick: settings.hasApiKey ? () => setAddModalVisible(true) : () => navigate("/movies/add"),
    };

    const MovieListProps: ListProps = {
        // Probably won;'t be a lot of items, so sorting in FE makes sense
        items: SortMedia<Movie>(data || [], sort, ascending)
            .filter((movie: Movie) => movie.title.toLowerCase().includes(search.toLowerCase()) &&
                movie.genres!.includes(filter)) || [],

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