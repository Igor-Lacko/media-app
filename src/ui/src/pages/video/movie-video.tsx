import Movie from "@shared/interface/models/movie";
import useFetchById from "hooks/use-fetch-by-id";
import VideoPlayerLayout from "layouts/video-player";
import { useState, useEffect } from "react";

export default function MovieVideo() {
    const movie = useFetchById<Movie>("/api/movies", "id");
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (movie && movie.videoUrl) {
            setIsReady(true);
        }
    }, [movie]);

    if (!isReady) {
        return <div>Loading...</div>;
    }

    return (
        <VideoPlayerLayout
            title={movie!.title || "Movie Video"}
            url={movie!.videoUrl!}
            onClose={() => window.history.back()}
        />
    );
}