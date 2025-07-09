import SortKey from "@shared/enum/sort-key";
import Lecture from "@shared/interface/models/lecture";
import Season from "@shared/interface/models/season";

/**
 * Sorts media items based on the provided sort key.
 * @param models Array of media items to be sorted.
 * @param sortBy The key by which to sort the media items.
 * @returns Sorted array of media items.
 * @todo Add toggle for ascending/descending order.
 */
export function SortMedia<T extends { 
    title: string;              // Only common one for all
    rating?: number;            // Movies, TV shows
    length?: number;            // Movies
    seasons?: Season[];         // TV shows
    lectures?: Lecture[];       // Courses
}> (models: T[], sortBy: SortKey): T[] {
    switch (sortBy) {
        case SortKey.NAME:
            return models.sort((a, b) => a.title.localeCompare(b.title));

        case SortKey.RATING:
            return models.sort((a, b) => b.rating! - a.rating!);

        case SortKey.LENGTH:
            return models.sort((a, b) => a.length! - b.length!);

        case SortKey.NOF_SEASONS:
            return models.sort((a,b) => a.seasons!.length - b.seasons!.length);

        case SortKey.NOF_EPISODES:
            return models.sort((a,b) => {
                const nofEpisodesA = a.seasons!.reduce((current, season) => current + season.episodes.length, 0);
                const nofEpisodesB = b.seasons!.reduce((current, season) => current + season.episodes.length, 0);
                return nofEpisodesA - nofEpisodesB
            });

        case SortKey.NOF_LECTURES:
            return models.sort((a,b) => a.lectures!.length - b.lectures!.length);
    }
}