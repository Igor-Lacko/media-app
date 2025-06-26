import DetailLayout from "layouts/detail-layout";
import Movie from "@shared/interface/models/movie";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";

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
            onMarkFavorite: () => { /* Implement mark favorite functionality */ },
            rateTitle: "Rate Movie",
            onRate: () => { /* Implement rate functionality */ },
            onSetWatchStatus: () => { /* Implement set watch status functionality */ },
        },
    }

    return <DetailLayout<Movie> {...props}/>;
}