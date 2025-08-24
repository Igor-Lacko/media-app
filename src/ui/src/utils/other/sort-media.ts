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
export function SortMedia<
	T extends {
		title: string; // Only common one for all
		rating?: number; // Movies, TV shows
		length?: number; // Movies
		seasons?: Season[]; // TV shows
		lectures?: Lecture[]; // Courses
	},
>(models: T[], sortBy: SortKey, asc: boolean): T[] {
	switch (sortBy) {
		case SortKey.NAME:
			return asc ?
					models.sort((a, b) => a.title.localeCompare(b.title))
				:	models.sort((a, b) => b.title.localeCompare(a.title));

		case SortKey.RATING:
			return asc ?
					models.sort((a, b) => a.rating! - b.rating!)
				:	models.sort((a, b) => b.rating! - a.rating!);

		case SortKey.LENGTH:
			return asc ?
					models.sort((a, b) => a.length! - b.length!)
				:	models.sort((a, b) => b.length! - a.length!);

		case SortKey.NOF_SEASONS:
			return asc ?
					models.sort((a, b) => a.seasons!.length - b.seasons!.length)
				:	models.sort((a, b) => b.seasons!.length - a.seasons!.length);

		case SortKey.NOF_EPISODES:
			return models.sort((a, b) => {
				const nofEpisodesA = a.seasons!.reduce(
					(current, season) => current + season.episodes.length,
					0,
				);
				const nofEpisodesB = b.seasons!.reduce(
					(current, season) => current + season.episodes.length,
					0,
				);
				return asc ?
						nofEpisodesA - nofEpisodesB
					:	nofEpisodesB - nofEpisodesA;
			});

		case SortKey.NOF_LECTURES:
			return asc ?
					models.sort(
						(a, b) => a.lectures!.length - b.lectures!.length,
					)
				:	models.sort((a, b) => b.lectures!.length - a.lectures!.length);
	}
}
