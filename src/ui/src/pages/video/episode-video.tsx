import WatchStatus from "@shared/enum/watch-status";
import Episode from "@shared/interface/models/episode";
import Season from "@shared/interface/models/season";
import TvShow from "@shared/interface/models/tv-show";
import UpdateData, { UpdateLength, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import { useRef } from "react";

/**
 * Episode video player page.
 */
export default function EpisodeVideo() {
    const {model: episode, isLoading: episodeLoading} = useFetchById<Episode>("/api/episodes", "episodeId")!;

    // Fetch season and show for title
    const {model: season, isLoading: seasonLoading} = useFetchById<Season>("/api/seasons", "seasonId");
    const {model: show, isLoading: showLoading} = useFetchById<TvShow>("/api/shows");

    // Video ref
    const videoRef = useRef<HTMLVideoElement | null>(null);

    if (episodeLoading || seasonLoading || showLoading) {
        return <LoadingPage />;
    }

    else if (!season || !episode || !show) {
        return <NotFoundPage
                    message={"Episode, season, or show not found"}
                />;
    }

    return (
        <VideoPlayerLayout
            title={`${show.title}: S${season.seasonNumber}E${episode.episodeNumber} - ${episode.title}`}
            url={episode.videoUrl || ""}
            backUrl={`/tv-shows/${show.identifier}/${season.identifier}/${episode.identifier}`}

            saveContinueAt={async (time: number) => {
                await UpdatePlaybackPosition<Episode>("/api/episodes", episode, time);
            }}
            saveLength={async (length: number) => {
                await UpdateLength<Episode>("/api/episodes", episode, length);
            }}
            onInit={async () => await UpdateData<TvShow>("/api/shows", show.identifier!, {watchStatus: WatchStatus.WATCHING})}
            onFinish={async () => await UpdateData<Episode>("/api/episodes", episode.identifier!, {watchStatus: WatchStatus.COMPLETED})}
            initialPlaybackTime={episode.continueAt || 0}
            ref={videoRef}
        />
    )
}