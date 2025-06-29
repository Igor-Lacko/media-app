import DetailLayout from "layouts/detail-layout";
import Movie from "@shared/interface/models/movie";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";
import { MarkAsFavorite, UpdateDescription, UpdateRating, UpdateWatchStatus } from "data/crud/update";
import WatchStatus from "@shared/enum/watch-status";
import DeleteData from "data/crud/delete";

/**
 * Component for displaying movie details.
 * @returns Movie detail page.
 */
export default function MovieDetail() {
    // Parse movie id
    const movie : Movie | undefined = useFetchById<Movie>("/api/movies")

    if(!movie) {
        return <NotFoundPage message="Movie not found"/>
    }

    // Construct props for the detail layout
    const props : DetailProps<Movie> = {
        model: movie,
        title: movie.title,
        hasThumbnail: true,
        hasGenres: true,
        hasDescription: true,
        playable: true,
        canBeMarkedFavorite: true,
        headerType: DetailHeaders.ENTERTAINMENT,
        hasWatchStatus: true,
        editTitle: "Edit Movie",
        deleteTitle: "Delete Movie",
        deleteFunction: async () => await DeleteData("/api/movies", movie.identifier!),
        hasMarkFavorite: true,
        markFavoriteFunction: async () => await MarkAsFavorite<Movie>("/api/movies", movie),
        rateTitle: "Rate Movie",
        rateFunction: async (rating: number) => await UpdateRating<Movie>("/api/movies", movie, rating),
        watchStatusFunction: async (watchStatus: WatchStatus) => await UpdateWatchStatus<Movie>("/api/movies", movie, watchStatus),
        setDescriptionFunction: async (description: string) => await UpdateDescription<Movie>("/api/movies", movie, description)
    }

    return <DetailLayout<Movie> {...props}/>;
}