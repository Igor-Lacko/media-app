import DetailLayout from "layouts/detail-layout";
import TvShow from "@shared/interface/models/tv-show";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail/detail-props";
import NotFoundPage from "pages/other/page-not-found";
import DetailHeaders from "utils/enum/detail-headers";
import DeleteData from "data/crud/delete";
import { MarkAsFavorite, UpdateDescription, UpdateRating, UpdateWatchStatus } from "data/crud/update";
import { useEffect, useState } from "react";
import WatchStatus from "@shared/enum/watch-status";
import LoadingPage from "pages/other/loading-page";

/**
 * Component for displaying TV show details.
 * @returns Tv Show detail page.
 */
export default function TvShowDetail() {
    const {model: tvShow, isLoading} = useFetchById<TvShow>("/api/shows");

    // State vars
    const [description, setDescription] = useState(tvShow?.description);
    const [rating, setRating] = useState(tvShow?.rating);
    const [watchStatus, setWatchStatus] = useState(tvShow?.watchStatus || WatchStatus.UNWATCHED);
    const [isFavorite, setIsFavorite] = useState(tvShow?.isFavorite || false);

    // Update state on data load
    useEffect(() => {
        if (tvShow) {
            setDescription(tvShow.description);
            setRating(tvShow.rating);
            setWatchStatus(tvShow.watchStatus || WatchStatus.UNWATCHED);
            setIsFavorite(tvShow.isFavorite || false);
        }
    }, [tvShow]);

    if (isLoading) {
        return <LoadingPage />;
    }

    else if (!tvShow) {
        return <NotFoundPage message="TV Show not found" />
    }

    // Props including children
    const props : DetailProps<TvShow> = {
        model: tvShow,
        submedia: tvShow.seasons,
        title: tvShow.title!,
        hasThumbnail: true,
        hasGenres: true,
        description: description,
        rating: rating,
        watchStatus: watchStatus,
        isFavorite: isFavorite,
        backUrl: "/tv-shows",
        headerType: DetailHeaders.ENTERTAINMENT,
        listProps: {
            path: "seasons",
            items: tvShow.seasons,
            showRating: true,
            showThumbnail: false,
            notFoundTitle: "No seasons found",
            notFoundMessage: "This TV show has no seasons yet. You can add one by clicking the 'Add Season' button above, or edit the TV show to add a season.",
        },
        addTitle: "Add Season",
        editTitle: "Edit TV Show",
        deleteTitle: "Delete TV Show",
        deleteFunction: async () => await DeleteData("/api/shows", tvShow.identifier!),
        markFavoriteFunction: async () => {
            setIsFavorite(!isFavorite);
            return await MarkAsFavorite<TvShow>("/api/shows", tvShow);
        },
        rateTitle: "Rate TV Show",
        rateFunction: async (rating: number) => {
            setRating(rating);
            return await UpdateRating<TvShow>("/api/shows", tvShow, rating);
        },
        watchStatusFunction: async (watchStatus) => {
            setWatchStatus(watchStatus);
            return await UpdateWatchStatus<TvShow>("/api/shows", tvShow, watchStatus);
        },
        setDescriptionFunction: async (description: string) => {
            setDescription(description);
            return await UpdateDescription<TvShow>("/api/shows", tvShow, description);
        }
    };

    return <DetailLayout<TvShow> {...props} />;
}