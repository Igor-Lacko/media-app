import Episode from "@shared/interface/models/episode";
import DeleteData from "data/crud/delete";
import { UpdateRating, UpdateWatchStatus } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import NotFoundPage from "pages/not-found";
import { useEffect, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail-props";

/**
 * Detail page for a episode.
 */
export default function EpisodeDetail() {
    const episode : Episode | undefined = useFetchById<Episode>("/api/episodes", "episodeId");

    // State
    const [rating, setRating] = useState(episode?.rating);
    const [watchStatus, setWatchStatus] = useState(episode?.watchStatus);

    // To load on render
    useEffect(() => {
        if (episode) {
            setRating(episode.rating);
            setWatchStatus(episode.watchStatus);
        }
    }, [episode]);

    // 404
    if (!episode) {
        return <NotFoundPage message="Episode not found" />;
    }

    const props : DetailProps<Episode> = {
        model: episode,
        title: episode.title!,
        rating: rating,
        watchStatus: watchStatus,
        hasThumbnail: false,
        hasGenres: false,
        playable: true,
        headerType: DetailHeaders.ENTERTAINMENT,
        editTitle: "Edit Episode",
        deleteTitle: "Delete Episode",
        deleteFunction: async () => await DeleteData("/api/episodes", episode.identifier!),
        rateTitle: "Rate Episode",
        rateFunction: async (rating: number) => {
            setRating(rating);
            return await UpdateRating<Episode>("/api/episodes", episode, rating);
        },
        watchStatusFunction: async (watchStatus: string) => {
            setWatchStatus(watchStatus);
            return await UpdateWatchStatus<Episode>("/api/episodes", episode, watchStatus);
        }
    }

    return <DetailLayout<Episode> {...props}/>;
}