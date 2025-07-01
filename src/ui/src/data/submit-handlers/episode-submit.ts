import Episode from "@shared/interface/models/episode";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Submits an episode to the server.
 * @param episode Episode object to submit
 * @param creating If true, a new episode is being created; if false, an existing episode is being updated.
 * @param seasonId Season ID to which the episode belongs, required when creating a new episode.
 * @returns Promise resolving to true if the submission was successful, false otherwise.
 */
export default async function SubmitEpisode(
    episode: Episode, 
    creating: boolean, 
    seasonId?: number) : Promise<boolean> {
    // Only title is required
    if (episode.title === "") {
        return false;
    }

    if (creating) {
        return await CreateData<Episode>(`/api/episodes/${seasonId}`, episode);
    }

    return await UpdateData<Episode>(`/api/episodes`, episode.identifier!, episode);
}