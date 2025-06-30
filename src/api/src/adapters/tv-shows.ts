import ClientTvShow from "@shared/interface/models/tv-show";
import { Show, EntertainmentGenre } from "generated/prisma/client";
import { DBSeason, DBSeasonToClient } from "./seasons";
import { Genre } from "generated/prisma/enums";

interface DBTvShow extends Show {
    seasons: DBSeason[];
    genres: EntertainmentGenre[];
}

export function SanitizeTvShowForDB (tvShow: ClientTvShow): ClientTvShow {
    // Remove fields that should not be stored in the database
    const { identifier, videoUrl, length, continueAt, submediaString, ...sanitizedTvShow } = tvShow;

    // Return the new DB data object
    return sanitizedTvShow;
}

export function DBTvShowToClient(tvShow: DBTvShow): ClientTvShow {
    const { id, ...data } = tvShow;
    return {
        ...data,
        identifier: id,
        submediaString: `${tvShow.seasons.length} seasons`,
        seasons: tvShow.seasons.map(season => DBSeasonToClient(season)),
        genres: tvShow.genres.map((genre) : Genre => genre.genre),
    }
}