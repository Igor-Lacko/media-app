import DetailLayout from "layouts/detail-layout";
import Movie from "@shared/interface/models/movie";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail/detail-props";
import NotFoundPage from "pages/other/page-not-found";
import DetailHeaders from "utils/enum/detail-headers";
import { MarkAsFavorite, UpdateDescription, UpdateRating, UpdateVideoUrl, UpdateWatchStatus } from "data/crud/update";
import WatchStatus from "@shared/enum/watch-status";
import DeleteData from "data/crud/delete";
import { useEffect, useRef, useState } from "react";
import LoadingPage from "pages/other/loading-page";

/**
 * Component for displaying movie details.
 * @returns Movie detail page.
 */
export default function MovieDetail() {
    // Parse movie id
    const {model: movie, isLoading} = useFetchById<Movie>("/api/movies");

    // State vars
    const [description, setDescription] = useState(movie?.description);
    const [rating, setRating] = useState(movie?.rating);
    const [watchStatus, setWatchStatus] = useState(movie?.watchStatus || WatchStatus.UNWATCHED);
    const [isFavorite, setIsFavorite] = useState(movie?.isFavorite || false);

    // Video url ref
    const videoUrlRef = useRef(movie?.videoUrl || "");

    // UseEffect to load the movie if it doesn't immediately, todo refactor loading?
    useEffect(() => {
        if (movie) {
            videoUrlRef.current = movie.videoUrl || "";
        }
    }, [movie]);

    if (isLoading) {
        return <LoadingPage/>;
    }

    // 404, shouldn't happen?
    else if(!movie) {
        return <NotFoundPage message="Movie not found"/>
    }

    const props : DetailProps<Movie> = {
        model: movie,
        title: movie.title!,
        description: description,
        rating: rating,
        isFavorite: isFavorite,
        videoUrl: videoUrlRef,
        watchStatus: watchStatus,
        hasThumbnail: true,
        hasGenres: true,
        playTitle: "Play Movie",
        headerType: DetailHeaders.ENTERTAINMENT,
        editTitle: "Edit Movie",
        deleteTitle: "Delete Movie",
        deleteFunction: async () => await DeleteData("/api/movies", movie.identifier!),
        markFavoriteFunction: async () => {
            setIsFavorite(!isFavorite);
            return await MarkAsFavorite<Movie>("/api/movies", movie);
        },
        rateTitle: "Rate Movie",
        setVideoUrlFunction: async (videoUrl: string) => {
            videoUrlRef.current = videoUrl;
            return await UpdateVideoUrl<Movie>("/api/movies", movie, videoUrl);
        },
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