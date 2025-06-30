import Episode from "@shared/interface/models/episode";

/**
 * Removes an episode from the list of episodes and updates the episode numbers.
 * Used in the form page.
 * @param removed The episode to be removed.
 * @param episodes The current list of episodes.
 * @param setEpisodes Function to update the list of episodes.
 */
export function RemoveEpisodeFromShowFilter(
    removed: Episode,
    episodes: Episode[],
    setEpisodes: (episodes: Episode[]) => void,
) {
    const updatedEpisodes = episodes
        // Remove all episodes with the same season and episode number (so the removed one)
        .filter((episode) => episode.episodeNumber !== removed.episodeNumber 
        || episode.seasonNumber !== removed.seasonNumber)

    setEpisodes(updatedEpisodes);
}

/**
 * Removes an episode from the list of episodes in a season and updates the episode numbers.
 * Used in the form page.
 * @param removed The episode to be removed.
 * @param episodes The current list of episodes in the season.
 * @param setEpisodes Function to update the list of episodes in the season.
 */
export function RemoveEpisodeFromSeasonFilter(
    removed: Episode,
    episodes: Episode[],
    setEpisodes: (episodes: Episode[]) => void,
) {
    const updatedEpisodes = episodes
        .filter((episode) => episode.episodeNumber !== removed.episodeNumber)
    setEpisodes(updatedEpisodes);
}