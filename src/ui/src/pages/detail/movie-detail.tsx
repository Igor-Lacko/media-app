import DetailLayout from "layouts/detail-layout";
import Movie from "@shared/interface/models/movie";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";
import UpdateData, { MarkAsFavorite, UpdateRating, UpdateWatchStatus } from "data/crud/update";
import WatchStatus from "@shared/enum/watch-status";

/**
 * Component for displaying movie details.
 * @returns Movie detail page.
 */
export default function MovieDetail() {
    // Parse movie id
    const movie : Movie | undefined = useFetchById<Movie>("/api/movies")

    if(!movie) {
        return <NotFoundPage message="Movie not found" />
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
        editBarProps: {
            editTitle: "Edit Movie",
            onEdit: () => { /* Implement edit functionality */ },
            deleteTitle: "Delete Movie",
            onDelete: () => { /* Implement delete functionality */ },
            hasMarkFavorite: true,
            onMarkFavorite: async () => { await MarkAsFavorite<Movie>("/api/movies", movie) },
            rateTitle: "Rate Movie",
            onRate: async (rating : number) => { await UpdateRating<Movie>("/api/movies", movie, rating) },
            onSetWatchStatus: async (watchStatus : WatchStatus) => { await UpdateWatchStatus<Movie>("/api/movies", movie, watchStatus)},
        },
    }

    return <DetailLayout<Movie> {...props}/>;
}