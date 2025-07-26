import Season from "@shared/interface/models/season";
import prisma from "db/db";
import {
	CreateEpisode,
	UpdateEpisode,
	UpdateOrCreateEpisode,
} from "./episode-controller";
import Episode from "@shared/interface/models/episode";
import { DBSeasonToClient, SanitizeClientSeasonToDB } from "adapters/seasons";
import { SanitizeClientEpisodeToDB } from "adapters/episodes";
import { UpdateSeasonNumbers } from "./tv-show-controller";
import { WatchStatus } from "@shared/enum/watch-status";

/**
 * Gets a season by its ID, including its episodes.
 * @param id Unique identifier of the season.
 * @returns Season object if found, null otherwise.
 */
export async function GetSeasonById(id: number): Promise<Season | null> {
	try {
		const season = await prisma.season.findUnique({
			where: {
				id: id,
			},

			include: {
				episodes: true,
			},
		});

		if (!season) {
			return null;
		}

		return DBSeasonToClient(season);
	} catch (error) {
		return null;
	}
}

/**
 * Create a new season in the database.
 * @param season Season object to create.
 * @param showId Identifier of the show to which the season belongs.
 * @returns True if the creation was successful, false otherwise.
 */
export async function CreateSeason(
	season: Season,
	showId: number,
): Promise<boolean> {
	const sanitizedSeason = SanitizeClientSeasonToDB(season);
	try {
		await prisma.season.create({
			data: {
				...sanitizedSeason,
				show: {
					connect: {
						id: showId,
					},
				},
				seasonNumber:
					season.seasonNumber === -1
						? (await prisma.season.count({
								where: {
									showId: showId,
								},
						  })) + 1
						: season.seasonNumber,
				episodes: {
					create: season.episodes.map((episode: Episode) => {
						const sanitizedEpisode = SanitizeClientEpisodeToDB(
							episode,
						) as Episode;
						return {
							...sanitizedEpisode,
						};
					}),
				},
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Update a season by its ID. Also called by UpdateTvShow().
 * @param id Identifier of the season to update.
 * @param seasonData Partial object containing fields to update.
 * @returns Updated Season object if successful, null otherwise.
 */
export async function UpdateSeason(
	id: number,
	seasonData: Partial<Season>,
): Promise<boolean> {
	const sanitizedSeason = SanitizeClientSeasonToDB(seasonData as Season);

	try {
		await prisma.season.update({
			where: {
				id: id,
			},

			data: {
				...sanitizedSeason,

				// Delete episodes that are not in the new list
				episodes: sanitizedSeason.episodes
					? {
							deleteMany: {
								id: {
									notIn: sanitizedSeason.episodes
										.filter(
											(episode: Episode) =>
												episode.identifier !==
												undefined,
										)
										.map(
											(episode: Episode) =>
												episode.identifier,
										),
								},
							},
					  }
					: undefined,
			},
		});

		// Update/create episodes
		if (seasonData.episodes) {
			for (const episode of seasonData.episodes) {
				episode.identifier
					? await UpdateEpisode(episode.identifier, episode)
					: await CreateEpisode(episode, id);
			}
		}

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Updates the episode numbers for a season to be sequential.
 * Called after removing a episode, for example episode 2 -- 1 and 3 keep their numbers, so 3 has to be decremented.
 * @param seasonId Identifier of the season to update.
 * @returns True if the update was successful, false otherwise.
 */
export async function UpdateEpisodeNumbers(seasonId: number): Promise<boolean> {
	try {
		const episodes = await prisma.episode.findMany({
			where: {
				seasonId: seasonId,
			},

			orderBy: {
				episodeNumber: "asc",
			},
		});

		for (let i = 0; i < episodes.length; i++) {
			const episode = episodes[i];
			if (episode.episodeNumber !== i + 1) {
				await prisma.episode.update({
					where: {
						id: episode.id,
					},

					data: {
						episodeNumber: i + 1,
					},
				});
			}
		}
	} catch (error) {
		return false;
	}
}

/**
 * Marks the first `count` episodes of a season as completed.
 * @param count The number of episodes to mark as completed.
 * @param seasonId The ID of the season.
 * @returns True if the operation was successful, false otherwise.
 */
export async function MarkEpisodesAsCompleted(count: number, seasonId: number): Promise<boolean> {
	try {
		// First mark the completed episodes as watched
		await prisma.episode.updateMany({
			where: {
				seasonId: seasonId,
				episodeNumber: {
					lte: count,
				}
			},

			data: {
				watchStatus: WatchStatus.COMPLETED
			}
		}).catch(() => {
			return false;
		});
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Deletes a season by its ID.
 * @param id Identifier of the season to delete.
 * @returns True if the deletion was successful, false otherwise.
 */
export async function DeleteSeason(id: number): Promise<boolean> {
	// Episodes deleted by cascade
	try {
		// Get the show ID first
		const showID = await prisma.season.findUnique({
			where: {
				id: id,
			},

			select: {
				showId: true,
			},
		});

		// Delete season
		await prisma.season.delete({
			where: {
				id: id,
			},
		});

		// Update other seasons (should never fail but prisma query results are optional)
		return await UpdateSeasonNumbers(showID?.showId || -1);
	} catch (error) {
		return false;
	}
}
