import { Genre } from "generated/prisma/enums";
import TvMazeSeason from "./interface/tv-maze-season";
import TvMazeEpisode from "./interface/tv-maze-episode";

/**
 * "Cleans" the tv show summary returned by the TV Maze API (can contain hex characters ot HTML tags).
 * @param summary The summary returned by the TV Maze API.
 * @returns That same summary as plain text.
 */
export function TvMazeSummaryToDB(summary: string): string {
    // Remove HTML
    return summary.replace(/<[^>]*>/gi, "")
    // Remove hex characters (from https://gist.github.com/daxburatto/307e8365c41fd5401f9ac315676490bf)
    .replace(/#?([a-f0-9]{6}|[a-f0-9]{3})/gi, "");
}

/**
 * Converts an array of genres from the TV Maze API to an array of Genre enums.
 * @param genres An array of genre strings from the TV Maze API.
 * @returns An array of Genre enums.
 */
export function TvMazeGenresToDB(genres: string[]): Genre[] {
    // Alllowed values
    const allowedGenres = Object.values(Genre)
    .filter((genre) => genre !== Genre.ALL)
    .map((genre) => genre.toUpperCase());

    // Current values, start with ALL
    let currentGenres : Genre[] = [Genre.ALL];

    for (const genre of genres) {
        const trimmed = genre.trim().toUpperCase();
        if (allowedGenres.includes(trimmed)) {
            currentGenres.push(trimmed as Genre);
        }
    }

    return currentGenres;
}

export function TvMazeEpisodesToSeasons(episodes: TvMazeEpisode[]): TvMazeSeason[] {
    // Map of [seasonNumber, season]
    const seasons = new Map<number, TvMazeSeason>();

    for (const episode of episodes) {
        // Create a new map entry if it doesn't exist already
        if (!seasons.has(episode.season)) {
            seasons.set(episode.season, {
                seasonNumber: episode.season,
                episodes: [episode],
                rating: episode.rating.average,
            });
        }

        // Else just add the episode
        else {
            let season = seasons.get(episode.season);
            season.episodes.push(episode);
            season.rating += episode.rating.average;
        }
    }

    // Divide ratings for all seasons
    seasons.forEach((season) => {
        // Seems like their ratings are < 0, 10 > so i think nothing else is needed here
        season.rating /= season.episodes.length;
    });

    return Array.from(seasons.values());
}