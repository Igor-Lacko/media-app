import Episode from "@shared/interface/models/episode";

/**
 * Removes an episode from the list of episodes and updates the episode numbers.
 * Used in the form page.
 * @param removed The episode to be removed.
 * @param episodes The current list of episodes.
 * @param setEpisodes Function to update the list of episodes.
 */
export default function RemoveEpisodeFilter(
    removed: Episode,
    episodes: Episode[],
    setEpisodes: (episodes: Episode[]) => void,
    episodeCounterRef: React.RefObject<number>
) {
    const updatedEpisodes = episodes
        // Remove all episodes with the same season and episode number (so the removed one)
        .filter((episode) => episode.episodeNumber !== removed.episodeNumber || episode.seasonNumber !== removed.seasonNumber)
        // Update each episode with the same season number
        .map((episode) => {
            if (episode.seasonNumber === removed.seasonNumber) {
                return {
                    ...episode,
                    episodeNumber: episodeCounterRef.current++
                };
            }

            return episode;
        });

    setEpisodes(updatedEpisodes);
}
