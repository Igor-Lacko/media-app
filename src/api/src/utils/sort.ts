import SortKey from "@shared/enum/sort-key";
import TvShow from "@shared/interface/models/tv-show";
import Subject from "@shared/interface/models/subject";

/**
 * Sorts an array of TV shows based on the specified key, if not done already.
 * @param tvShows The array of TV shows to sort.
 * @param key The key to sort by, defaults to SortKey.NAME.
 * @returns The sorted array of TV shows.
 */
export function SortTvShows(tvShows: TvShow[], key: SortKey) {
    switch (key) {
        case SortKey.NOF_EPISODES:
            return tvShows.sort((a, b) => {
                const nofEpisodesA = a.seasons.reduce((sum, season) => sum + season.episodes.length, 0);
                const nofEpisodesB = b.seasons.reduce((sum, season) => sum + season.episodes.length, 0);
                return nofEpisodesB - nofEpisodesA;
            }
        );

        case SortKey.NOF_SEASONS:
            return tvShows.sort((a, b) => b.seasons.length - a.seasons.length);

        default:
            return tvShows;
    }
}

/**
 * Sorts an array of subjects based on the specified key, if not done already.
 * @param subjects Subjects to sort.
 * @param key Key to sort by.
 * @returns Sorted subjects based on the key.
 */
export function SortSubjects(subjects: Subject[], key: SortKey) {
    switch (key) {
        case SortKey.NOF_LECTURES:
            return subjects.sort((a, b) => b.lectures.length - a.lectures.length);

        default:
            return subjects;
    }
}