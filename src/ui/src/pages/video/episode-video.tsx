import Episode from "@shared/interface/models/episode";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";

/**
 * Episode video player page.
 */
export default function EpisodeVideo() {
    const episode : Episode = useFetchById<Episode>("/api/episodes", "episodeId")!;
    return (
        <VideoPlayerLayout
            title={episode.title || "Episode Video"}
            url={episode.videoUrl || ""}
            onClose={() => window.history.back()}
        />
    )
}