import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import { useQuery } from "@tanstack/react-query";
import CardGrid from "components/lists/card-grid";
import HomePageSection from "components/sections/homepage-section";
import { FetchData, FetchLastWatchedItems } from "data/crud/read";
import LoadingPage from "pages/other/loading-page";

/**
 * App home page. Displays a list of favorites, recently watched items and a to-watch list.
 */
export default function HomePage() {
    // Fetch favorites
    const {data: favorites, isLoading: favoritesLoading} = useQuery({
        queryKey: ["Favorites"],
        queryFn: async () => await FetchData<TvShow | Movie>("/api/favorites", {})
    });

    // Fetch last watched items
    const {data: lastWatched, isLoading: lastWatchedLoading} = useQuery({
        queryKey: ["LastWatched"],
        queryFn: async () => await FetchLastWatchedItems(5)
    });

    if (favoritesLoading || lastWatchedLoading) {
        return <LoadingPage />;
    }

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center py-0 m-0 overflow-y-auto"}
        >
            <HomePageSection
                title={"Continue Watching"}
            >
                TODO
            </HomePageSection>
            <HomePageSection
                title={"Favorites"}
            >
                {favorites && <CardGrid
                    items={favorites}
                    extraClassNames={"w-full h-full"}
                />}
            </HomePageSection>
        </div>
    );
}
