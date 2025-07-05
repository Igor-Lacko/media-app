import Episode from "@shared/interface/models/episode";
import Season from "@shared/interface/models/season";
import { UpdateLength, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";

/**
 * Episode video player page.
 */
export default function EpisodeVideo() {
    const episode : Episode = useFetchById<Episode>("/api/episodes", "episodeId")!;

    // Fetch season for title
    const season : Season | undefined = useFetchById<Season>("/api/seasons", "seasonId");

    return (
        <VideoPlayerLayout
            title={season ? `S${season.seasonNumber}:E${episode.episodeNumber} - ${episode.title}` 
                : `Episode ${episode.episodeNumber} : ${episode.title}`}
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