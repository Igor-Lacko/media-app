import ClientEpisode from "@shared/interface/models/episode";
import { Episode } from "generated/prisma/client";

export function SanitizeClientEpisodeToDB (episode : ClientEpisode): Partial<ClientEpisode> {
    const {
        identifier,
        submediaString,
        seasonNumber,
        thumbnailUrl,
        ...sanitizedEpisode
    } = episode;

    return sanitizedEpisode;
}

export function DBEpisodeToClient(episode: Episode): ClientEpisode {
    const { id, seasonId, ...data } = episode;
    return {
        ...data,
        identifier: id,
        seasonNumber: -1 // Placeholder, maybe todo?
    };
}