import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import { useQuery } from "@tanstack/react-query";
import CardGrid from "components/lists/card-grid";
import MediaItemCard from "components/other/media-item-card";
import HomePageSection from "components/sections/homepage-section";
import { FetchData } from "data/crud/read";

/**
 * App home page. Displays a list of favorites, recently watched items and a to-watch list.
 */
export default function HomePage() {
    // Fetch favorites
    const favorites : (TvShow | Movie)[] = useQuery({
        queryKey: ["Favorites"],
        queryFn: async () => await FetchData<TvShow | Movie>("/api/favorites", {})
    }).data || [];

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center py-20 m-0 overflow-y-scroll"}
        >
            <HomePageSection
                title={"Continue Watching"}
            >
                TODO
            </HomePageSection>
            <HomePageSection
                title={"Favorites"}
            >
                <CardGrid
                    items={favorites}
                    extraClassNames={"w-full h-full"}
                />
            </HomePageSection>
        </div>
    );
}
