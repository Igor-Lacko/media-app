import WatchStatus from "@shared/enum/watch-status";
import Movie from "@shared/interface/models/movie";
import UpdateData, { UpdateLength, UpdatePlaybackPosition } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import { useRef } from "react";

export default function MovieVideo() {
    const {model: movie, isLoading} = useFetchById<Movie>("/api/movies", "id");

    // Video ref
    const videoRef = useRef<HTMLVideoElement | null>(null);

    if (isLoading) {
        return <LoadingPage />;
    }

    else if (!movie) {
        return <NotFoundPage
                    message={"Movie not found"}
                />;
    }

    return (
        <VideoPlayerLayout
            title={movie!.title || "Movie Video"}
            url={movie!.videoUrl!}
            backUrl={`/movies/${movie!.identifier}`}
            saveContinueAt={async (time: number) => {
                await UpdatePlaybackPosition<Movie>("/api/movies", movie!, time);
            }}
            saveLength={async (length: number) => {
                await UpdateLength<Movie>("/api/movies", movie!, length);
            }}
            onFinish={async () => await UpdateData<Movie>("/api/movies", movie!.identifier!, {watchStatus: WatchStatus.COMPLETED})}
            initialPlaybackTime={movie!.continueAt || 0}
            ref={videoRef}
        />
    );
}