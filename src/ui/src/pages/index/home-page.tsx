import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import { useQuery } from "@tanstack/react-query";
import MediaItemCard from "components/other/media-item-card";
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
            className={"flex w-full h-full flex-col items-center justify-center p-0 m-0"}
        >
            {favorites.map((item) => (
                <MediaItemCard
                    model={item}
                    url={item.submediaString ? `/tv-shows/${item.identifier}` : `/movies/${item.identifier}`}
                />
            ))}
        </div>
    );
}
