import { useQuery } from "@tanstack/react-query";

import ControlBar from "components/controls/control-bar";
import TvShow from "@shared/interface/models/tv-show";
import useFilter from "hooks/use-filter";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/lists/media-item-list";
import ControlBarProps from "utils/props/control-elements/control-bar-props";
import ListProps from "utils/props/lists/list-props";
import LoadingPage from "pages/other/loading-page";
import { SortMedia } from "utils/other/sort-media";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TwoButtonsModal from "components/modals/navigate-modal";

/**
 * App TV show page.
 * Displays a list of TV shows with control bar for filtering/sorting.
 */
export default function TvShowPage() {
    // Filtering
    const { filter, setFilter, sort, setSort, search, setSearch, ascending, setAscending } = useFilter();

    // Modal to add normally or from API
    const [addModalVisible, setAddModalVisible] = useState(false);

    // To navigate
    const navigate = useNavigate();

    // Fetch
    const {data, isLoading} = useQuery({
        queryKey: ["shows", sort, filter],
        queryFn: async () => await FetchData<TvShow>("/api/shows"),
    });

    const controlBarProps : ControlBarProps = {
        title: "Your TV shows",
        filter: true,
        sortOptions: [SortKey.NAME, SortKey.NOF_EPISODES, SortKey.NOF_SEASONS, SortKey.RATING],
        onSortChange: (sortKey: SortKey) => { setSort(sortKey); },
        initialSort: sort,
        initialFilter: filter,
        initialSortOrder: ascending,
        onFilterChange: (filterKey: Genre) => { setFilter(filterKey); },
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm); },
        onSortOrderChange: (asc: boolean) => { setAscending(asc); },
        onAddClick: () => setAddModalVisible(true),
    }

    const tvShowListProps : ListProps = {
        // Sorted, filtered, and searched tv shows.
        items: SortMedia<TvShow>(data || [], sort, ascending)
        .filter((tvShow: TvShow) => tvShow.title.toLowerCase().includes(search.toLowerCase()) && 
        tvShow.genres!.includes(filter)) 
        || [],

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
            {addModalVisible && (
                <TwoButtonsModal
                    title={"Add TV Show"}
                    options={[
                        {
                            title: "Add from API",
                            onClick: () => navigate("/tv-shows/from-api"),
                        },
                        {
                            title: "Add manually",
                            onClick: () => navigate("/tv-shows/add"),
                        },
                    ]}
                    onClose={() => setAddModalVisible(false)}
                />
            )}
        </div>
    );
}