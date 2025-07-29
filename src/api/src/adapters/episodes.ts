import ClientEpisode from "@shared/interface/models/episode";
import { Episode } from "generated/prisma/client";
import WatchStatus from "@shared/enum/watch-status";

export function SanitizeClientEpisodeToDB(
	episode: ClientEpisode,
): Partial<ClientEpisode> {
	const {
		identifier,
		submediaString,
		seasonNumber,
		thumbnailUrl,
		...sanitizedEpisode
	} = episode;

	return sanitizedEpisode;
}

export function DBEpisodeToClient(
	episode: Episode,
	seasonNumber: number = -1,
): ClientEpisode {
	const { id, seasonId, ...data } = episode;
	return {
		...data,
		identifier: id,
		seasonNumber: seasonNumber, // Placeholder, maybe todo?
		videoUrl: episode.videoUrl || undefined,
		length: episode.length || undefined,
		watchStatus: episode.watchStatus as WatchStatus,
		lastWatchedAt: episode.lastWatchedAt || undefined,
		rating: episode.rating || undefined,
		shortDescription: episode.shortDescription || undefined,
	};
}
