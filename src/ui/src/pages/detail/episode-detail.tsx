import WatchStatus from "@shared/enum/watch-status";
import Episode from "@shared/interface/models/episode";
import TvShow from "@shared/interface/models/tv-show";
import DeleteData from "data/crud/delete";
import { UpdateRating, UpdateVideoUrl, UpdateWatchStatus } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import { useEffect, useRef, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";

/**
 * Detail page for a episode.
 */
export default function EpisodeDetail() {
    const { model: episode, isLoading: episodeLoading } = useFetchById<Episode>("/api/episodes", "episodeId");

    // Fetch season for title and URL and show for URL
    const { model: season, isLoading: seasonLoading } = useFetchById<Episode>("/api/seasons", "seasonId");
    const { model: show, isLoading: showLoading } = useFetchById<TvShow>("/api/shows");

    // State
    const [rating, setRating] = useState(episode?.rating);
    const [watchStatus, setWatchStatus] = useState(episode?.watchStatus);

    // Ref
    const videoUrlRef = useRef(episode?.videoUrl || "");

    // Update on data load
    useEffect(() => {
        setRating(episode?.rating);
        setWatchStatus(episode?.watchStatus);
        videoUrlRef.current = episode?.videoUrl || "";
    }, [episode]);


    if (episodeLoading || seasonLoading || showLoading) {
        return <LoadingPage />;
    }

    // 404
    else if (!episode || !season || !show) {
        return <NotFoundPage message="Episode not found" />;
    }

    const props: DetailProps<Episode> = {
        model: episode,
        title: season ? `S${season.seasonNumber}:E${episode.episodeNumber} - ${episode.title}`
            : `Episode ${episode.episodeNumber} : ${episode.title}`,
        rating: rating,
        watchStatus: watchStatus,
        videoUrl: videoUrlRef,
        watchStatusOptions: [WatchStatus.NOT_WATCHED, WatchStatus.COMPLETED],
        hasThumbnail: false,
        hasGenres: false,
        playTitle: "Play Episode",
        headerType: DetailHeaders.EPISODE,
        editTitle: "Edit Episode",
        deleteTitle: "Delete Episode",
        rateTitle: "Rate Episode",
        backUrl: `/tv-shows/${show.identifier}/${season.identifier}`,
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

    return <DetailLayout<Episode> {...props} />;
}