import TvShow from "@shared/interface/models/tv-show";
import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";
import { CreateData } from "data/crud/create";

/**
 * Submits a TV show to the database.
 * @param tvShow TV show to submit.
 * @param seasons Seasons associated with the TV show.
 * @param episodes Episodes associated with the TV show.
 * @return True if successful, false otherwise.
 */
export default async function TvShowSubmitHandler(tvShow: TvShow, seasons: Season[], episodes: Episode[]): Promise<boolean> {
    // Only mandatory fields
    if(tvShow.title === "" || tvShow.genres?.length === 1) {
        return false;
    }

    // Add episodes to seasons and seasons to TV show
    tvShow.seasons = seasons.map((season, index) => {
        return {
            ...season,
            seasonNumber: index + 1,
            episodes: episodes.filter(episode => episode.seasonNumber === index + 1)
        }
    });

    console.log("Submitting TV show:", tvShow);

    // Submit
    try {
        await CreateData<TvShow>("/api/shows", tvShow);
        return true;
    }

    catch (error) {
        console.error("Error submitting TV show:", error);
        return false;
    }
}