import Movie from "@shared/interface/models/movie";
import { UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";

export default function MovieVideo() {
    const movie = useFetchById<Movie>("/api/movies", "id");

    return (
        <VideoPlayerLayout
            title={movie!.title || "Movie Video"}
            url={movie!.videoUrl!}
            saveContinueAt={async (time: number) => {
                await UpdatePlaybackPosition<Movie>("/api/movies", movie!, time);
            }}
            initialPlaybackTime={movie!.continueAt || 0}
        />
    );
}