import ClientTvShow from "@shared/interface/models/tv-show";
import { Show, EntertainmentGenre } from "generated/prisma/client";
import { DBSeason, DBSeasonToClient } from "./seasons";
import ClientGenre from "@shared/enum/genre";
import WatchStatus from "@shared/enum/watch-status";
export interface DBTvShow extends Show {
	seasons: DBSeason[];
	genres: EntertainmentGenre[];
}

export function SanitizeTvShowForDB(tvShow: ClientTvShow): ClientTvShow {
	// Remove fields that should not be stored in the database
	const {
		identifier,
		videoUrl,
		length,
		continueAt,
		submediaString,
		...sanitizedTvShow
	} = tvShow;

	// Return the new DB data object
	return sanitizedTvShow;
}

export function DBTvShowToClient(tvShow: DBTvShow): ClientTvShow {
	const { id, ...data } = tvShow;
	return {
		...data,
		identifier: id,
		submediaString: `${tvShow.seasons.length} seasons`,
		watchStatus: tvShow.watchStatus as WatchStatus,
		description: tvShow.description || undefined,
		rating: tvShow.rating || undefined,
		thumbnailUrl: tvShow.thumbnailUrl || undefined,
		shortDescription: tvShow.shortDescription || undefined,
		seasons: tvShow.seasons.map((season) => DBSeasonToClient(season)),
		genres: tvShow.genres.map(
			(genre): ClientGenre => genre.genre as ClientGenre,
		),
	};
}
