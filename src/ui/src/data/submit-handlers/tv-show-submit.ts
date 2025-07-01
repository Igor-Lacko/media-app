import TvShow from "@shared/interface/models/tv-show";
import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Submits a TV show to the database.
 * @param tvShow TV show to submit.
 * @param seasons Seasons associated with the TV show.
 * @param episodes Episodes associated with the TV show.
 * @param update True if updating an existing TV show, false if creating a new one.
 * @param id Identifier of the TV show to update, if it has to be used.
 * @return True if successful, false otherwise.
 */
export default async function TvShowSubmitHandler(
    tvShow: TvShow,
    seasons: Season[],
    episodes: Episode[],
    update: boolean,
    id: number = 0
): Promise<boolean> {
    // Only mandatory fields
    if (tvShow.title === "" || tvShow.genres?.length === 1) {
        return false;
    }

    // Each episode has to have a title
    if (episodes.some((episode) => episode.title === "")) {
        return false;
    }

    // Add episodes to seasons and seasons to TV show
    tvShow.seasons = seasons.map((season, index) => {
        return {
            ...season,
            seasonNumber: index + 1,
            episodes: episodes.filter(
                (episode) => episode.seasonNumber === index + 1
            ),
        };
    });

    console.log("Submitting TV show:", tvShow);

    // Submit
    try {
        // Updating, don't create a new one
        if (update) {
            await UpdateData<TvShow>("api/shows", id, tvShow);
        }

        // Have to create a new one
        else {
            await CreateData<TvShow>("api/shows", tvShow);
        }

        return true;
    } 

    catch (error) {
        console.error("Error submitting TV show:", error);
        return false;
    }
}
