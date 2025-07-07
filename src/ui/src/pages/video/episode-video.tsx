import Episode from "@shared/interface/models/episode";
import Season from "@shared/interface/models/season";
import { UpdateLength, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";

/**
 * Episode video player page.
 */
export default function EpisodeVideo() {
    const {model: episode, isLoading: episodeLoading} = useFetchById<Episode>("/api/episodes", "episodeId")!;

    // Fetch season for title
    const {model: season, isLoading: seasonLoading} = useFetchById<Season>("/api/seasons", "seasonId");

    if (episodeLoading || seasonLoading) {
        return <LoadingPage />;
    }

    else if (!season || !episode) {
        return <NotFoundPage
                    message={"Episode or season not found"}
                />;
    }

    return (
        <VideoPlayerLayout
            title={`S${season.seasonNumber}:E${episode.episodeNumber} - ${episode.title}`}
            url={episode.videoUrl || ""}
            saveContinueAt={async (time: number) => {
                await UpdatePlaybackPosition<Episode>("/api/episodes", episode, time);
            }}
            saveLength={async (length: number) => {
                await UpdateLength<Episode>("/api/episodes", episode, length);
            }}
            initialPlaybackTime={episode.continueAt || 0}
        />
    )
}