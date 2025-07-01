import DetailLayout from "layouts/detail-layout";
import Movie from "@shared/interface/models/movie";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";
import { MarkAsFavorite, UpdateDescription, UpdateRating, UpdateWatchStatus } from "data/crud/update";
import WatchStatus from "@shared/enum/watch-status";
import DeleteData from "data/crud/delete";
import { useEffect, useState } from "react";

/**
 * Component for displaying movie details.
 * @returns Movie detail page.
 */
export default function MovieDetail() {
    // Parse movie id
    const movie : Movie | undefined = useFetchById<Movie>("/api/movies");

    // State vars
    const [description, setDescription] = useState(movie?.description);
    const [rating, setRating] = useState(movie?.rating);
    const [watchStatus, setWatchStatus] = useState(movie?.watchStatus || WatchStatus.UNWATCHED);

    // UseEffect to load the movie if it doesn't immediately, todo refactor loading?
    useEffect(() => {
        if (movie) {
            setDescription(movie.description || "");
            setRating(movie.rating || -1);
            setWatchStatus(movie.watchStatus || WatchStatus.UNWATCHED);
        }
    }, [movie]);

    console.log("MovieDetail", movie);

    // 404, shouldn't happen?
    if(!movie) {
        return <NotFoundPage message="Movie not found"/>
    }

    const props : DetailProps<Movie> = {
        model: movie,
        title: movie.title!,
        description: description,
        rating: rating,
        watchStatus: watchStatus,
        hasThumbnail: true,
        hasGenres: true,
        playTitle: "Play Movie",
        headerType: DetailHeaders.ENTERTAINMENT,
        editTitle: "Edit Movie",
        deleteTitle: "Delete Movie",
        deleteFunction: async () => await DeleteData("/api/movies", movie.identifier!),
        markFavoriteFunction: async () => await MarkAsFavorite<Movie>("/api/movies", movie),
        rateTitle: "Rate Movie",
        rateFunction: async (rating: number) => {
            setRating(rating);
            return await UpdateRating<Movie>("/api/movies", movie, rating)
        },
        watchStatusFunction: async (watchStatus: WatchStatus) => {
            setWatchStatus(watchStatus);
            return await UpdateWatchStatus<Movie>("/api/movies", movie, watchStatus);
        },
        setDescriptionFunction: async (description: string) => {
            setDescription(description);
            return await UpdateDescription<Movie>("/api/movies", movie, description)
        }
    }

    return <DetailLayout<Movie> {...props}/>;
}