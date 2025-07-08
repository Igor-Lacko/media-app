import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import { useQuery } from "@tanstack/react-query";
import CardGrid from "components/lists/card-grid";
import HomePageSection from "components/sections/homepage-section";
import { FetchData, FetchLastWatchedItems } from "data/crud/read";
import { IsValidVideo } from "utils/electron-api";
import LoadingPage from "pages/other/loading-page";
import { useEffect, useState } from "react";
import LastWatched from "@shared/interface/last-watched";
import LastWatchedPreview from "components/model-displays/last-watched-preview";

/**
 * App home page. Displays a list of favorites, recently watched items and a to-watch list.
 */
export default function HomePage() {
    // Fetch favorites
    const { data: favorites, isLoading: favoritesLoading } = useQuery({
        queryKey: ["Favorites"],
        queryFn: async () => await FetchData<TvShow | Movie>("/api/favorites", {})
    });

    // Fetch last watched items
    const { data: lastWatched, isLoading: lastWatchedLoading } = useQuery({
        queryKey: ["LastWatched"],
        queryFn: async () => await FetchLastWatchedItems(5)
    });

    const [validLastWatched, setValidLastWatched] = useState<LastWatched[]>(lastWatched || []);

    // Filter out invalid videos from last watched
    useEffect(() => {
        const filterInvalidVideos = async () => {
            if (!lastWatched) {
                return;
            }

            let validItems: LastWatched[] = [];
            await Promise.all(lastWatched.map(async (item) => {
                const isValid = await IsValidVideo(item.filePath);
                if (isValid) {
                    validItems.push(item);
                }
            }));

            console.log("Valid last watched items:", validItems);
            setValidLastWatched(validItems);
        }
        filterInvalidVideos();
    }, [lastWatched]);

    if (favoritesLoading || lastWatchedLoading) {
        return <LoadingPage />;
    }

    return (
        <div
            className={"flex min-w screen min-h-screen flex-col flex-grow items-start overflow-y-auto mt-15 justify-center py-0 m-0"}
        >
            {validLastWatched.length > 0 ? (
                <HomePageSection
                    title={"Continue Watching"}
                    extraClassNames={"w-full h-full"}
                    extraChildClassNames={"border-t w-full h-[800px] border-gray-300 dark:border-gray-700 justify-center items-center"}
                >
                    <LastWatchedPreview
                        models={validLastWatched}
                        extraClassNames={"w-2/3 h-full"}
                    />
                </HomePageSection>
            ) : <span>dadasd</span>}
            <HomePageSection
                title={"Favorites"}
                extraChildClassNames={"w-full h-full border-y border-gray-300 dark:border-gray-700"}
            >
                {favorites && <CardGrid
                    items={favorites}
                    extraClassNames={"w-full h-full"}
                />}
            </HomePageSection>
            <HomePageSection
                title={"Your To-Watch List"}
                extraClassNames={"mt-20"}
            >
                TODO
            </HomePageSection>
        </div>
    );
}
