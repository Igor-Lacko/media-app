import Episode from "@shared/interface/models/episode";
import { UpdateLength, UpdatePlaybackPosition } from "data/crud/update";
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