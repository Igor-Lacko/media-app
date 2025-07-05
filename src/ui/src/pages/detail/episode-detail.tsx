import Episode from "@shared/interface/models/episode";
import DeleteData from "data/crud/delete";
import { UpdateRating, UpdateVideoUrl, UpdateWatchStatus } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import NotFoundPage from "not-found/not-found";
import { useEffect, useRef, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail-props";

/**
 * Detail page for a episode.
 */
export default function EpisodeDetail() {
    const episode : Episode | undefined = useFetchById<Episode>("/api/episodes", "episodeId");

    // Fetch season for title
    const season : Episode | undefined = useFetchById<Episode>("/api/seasons", "seasonId");

    // State
    const [rating, setRating] = useState(episode?.rating);
    const [watchStatus, setWatchStatus] = useState(episode?.watchStatus);

    // Ref
    const videoUrlRef = useRef(episode?.videoUrl || "");

    // To load on render
    useEffect(() => {
        if (episode) {
            setRating(episode.rating);
            setWatchStatus(episode.watchStatus);
            videoUrlRef.current = episode.videoUrl || "";
        }
    }, [episode]);

    // 404
    if (!episode) {
        return <NotFoundPage message="Episode not found" />;
    }

    const props : DetailProps<Episode> = {
        model: episode,
        title: season ? `S${season.seasonNumber}:E${episode.episodeNumber} - ${episode.title}`
            : `Episode ${episode.episodeNumber} : ${episode.title}`,
        rating: rating,
        watchStatus: watchStatus,
        videoUrl: videoUrlRef,
        hasThumbnail: false,
        hasGenres: false,
        playTitle: "Play Episode",
        headerType: DetailHeaders.EPISODE,
        editTitle: "Edit Episode",
        deleteTitle: "Delete Episode",
        rateTitle: "Rate Episode",
        deleteFunction: async () => await DeleteData("/api/episodes", episode.identifier!),
        rateFunction: async (rating: number) => {
            setRating(rating);
            return await UpdateRating<Episode>("/api/episodes", episode, rating);
        },
        setVideoUrlFunction: async (videoUrl: string) => {
            videoUrlRef.current = videoUrl;
            return await UpdateVideoUrl<Episode>("/api/episodes", episode, videoUrl);
        },
        watchStatusFunction: async (watchStatus: string) => {
            setWatchStatus(watchStatus);
            return await UpdateWatchStatus<Episode>("/api/episodes", episode, watchStatus);
        }
    }

    return <DetailLayout<Episode> {...props}/>;
}