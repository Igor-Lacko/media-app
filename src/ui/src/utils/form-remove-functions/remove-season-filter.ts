import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";

/**
 * Removes a season from the list of seasons and updates the episodes.
 * Used in the form page.
 * @param removed The season to be removed.
 * @param seasons The current list of seasons.
 * @param setSeasons Function to update the list of seasons.
 * @param episodes The current list of episodes.
 * @param setEpisodes Function to update the list of episodes.
 */
export default function RemoveSeasonFilter(
    removed: Season,
    seasons: Season[],
    setSeasons: (seasons: Season[]) => void,
    episodes: Episode[],
    setEpisodes: (episodes: Episode[]) => void,
) {
    // Update seasons
    const updatedSeasons = seasons
        .filter((season) => season.seasonNumber !== removed.seasonNumber)
    setSeasons(updatedSeasons);

    // Update episodes
    const updatedEpisodes = episodes
        .filter(episode => episode.seasonNumber !== removed.seasonNumber)

    setEpisodes(updatedEpisodes);
}
