import DetailLayout from "layouts/detail-layout";
import TvShow from "@shared/interface/models/tv-show";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/other/not-found";
import DetailHeaders from "utils/enum/detail-headers";
import DeleteData from "data/crud/delete";
import { MarkAsFavorite, UpdateDescription, UpdateRating, UpdateWatchStatus } from "data/crud/update";
import { useEffect, useState } from "react";
import WatchStatus from "@shared/enum/watch-status";

/**
 * Component for displaying TV show details.
 * @returns Tv Show detail page.
 */
export default function TvShowDetail() {
    const tvShow : TvShow | undefined = useFetchById<TvShow>("/api/shows");

    // State vars
    const [description, setDescription] = useState(tvShow?.description);
    const [rating, setRating] = useState(tvShow?.rating);
    const [watchStatus, setWatchStatus] = useState(tvShow?.watchStatus || WatchStatus.UNWATCHED);

    // UseEffect to load the TV show if it doesn't immediately
    useEffect(() => {
        if (tvShow) {
            setDescription(tvShow.description);
            setRating(tvShow.rating);
            setWatchStatus(tvShow.watchStatus || WatchStatus.UNWATCHED);
        }
    }, [tvShow]);

    if(!tvShow) {
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
        headerType: DetailHeaders.ENTERTAINMENT,
        listProps: {
            path: "seasons",
            items: tvShow.seasons,
            showRating: true,
            showThumbnail: true
        },
        addTitle: "Add Season",
        editTitle: "Edit TV Show",
        deleteTitle: "Delete TV Show",
        deleteFunction: async () => await DeleteData("/api/shows", tvShow.identifier!),
        markFavoriteFunction: async () => await MarkAsFavorite<TvShow>("/api/shows", tvShow),
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