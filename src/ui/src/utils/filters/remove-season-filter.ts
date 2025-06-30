import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";

export default function RemoveSeasonFilter(
    removed: Season,
    seasons: Season[],
    setSeasons: (seasons: Season[]) => void,
    episodes: Episode[],
    setEpisodes: (episodes: Episode[]) => void,
    seasonCounterRef: React.RefObject<number>
) {
    const updatedSeasons = seasons
        .filter((season) => season.seasonNumber !== removed.seasonNumber)
        .map((season) => ({
            ...season,
            seasonNumber: seasonCounterRef.current++ 
        }));

    setSeasons(updatedSeasons);

    const updatedEpisodes = episodes
        .filter(episode => episode.seasonNumber !== removed.seasonNumber)

    setEpisodes(updatedEpisodes);
}
