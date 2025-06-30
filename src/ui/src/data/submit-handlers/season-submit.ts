import Season from "@shared/interface/models/season";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Defines a function to submit a season to the database.
 * @param season Season to submit.
 * @param updating If true, updates an existing season; if false, creates a new one.
 * @param showId Show ID to which the season belongs, if creating a new one.
 */
export default async function SubmitSeason(
    season: Season,
    updating: boolean,
    showId: number = 0
) : Promise<boolean> {
    season.episodes = season.episodes.map((episode, index) => {
        return {
            ...episode,
            episodeNumber: index + 1,
        };
    });

    try {
        if (updating) {
            await UpdateData<Season>("api/seasons", season.identifier!, season);
        }

        else {
            await CreateData<Season>(`api/seasons/${showId}`, season);
        }

        return true;
    }

    catch (error) {
        console.error("Error submitting season:", error);
        return false;
    }
}