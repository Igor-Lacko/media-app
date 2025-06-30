import ClientSeason from "@shared/interface/models/season";
import { Season, Episode } from "generated/prisma/client";
import { DBEpisodeToClient } from "./episodes";

export interface DBSeason extends Season {
    episodes: Episode[];
}

export function SanitizeClientSeasonToDB (season : ClientSeason): ClientSeason {
    const {
        identifier,
        submediaString,
        length,
        continueAt,
        genres,
        watchStatus,
        title,
        videoUrl,
        ...sanitizedSeason
    } = season;
    return sanitizedSeason;
}

export function DBSeasonToClient (season: DBSeason): ClientSeason {
    const { id, ...data } = season;
    return {
        identifier: id,
        ...data,
        episodes: season.episodes.map(episode => DBEpisodeToClient(episode)),
    };
}