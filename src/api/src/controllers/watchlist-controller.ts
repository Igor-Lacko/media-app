import WatchListItem from "@shared/interface/watchlist-item";
import prisma from "db/db";
import { WatchStatus } from "generated/prisma/enums";
import { DBTvShow } from "adapters/tv-shows";
import { DBSeason } from "adapters/seasons";
import { DBSubject } from "adapters/subjects";
/**
 * Utility function to calculate whether a season has been entirely completed.
 * @param season Season to check.   
 * @returns True if all episodes in the season have watchStatus === COMPLETED, false otherwise.
 */
function IsSeasonCompleted(season: DBSeason): boolean {
    return season.episodes.every(episode => episode.watchStatus === WatchStatus.COMPLETED) &&
            season.episodes.length > 0;
}

/**
 * Calculates the progress of a TV show based on its seasons and episodes.
 * @param tvShow TV show to calculate progress for.
 * @returns An object containing the progress string and percentage.
 */
function CalculateTvShowProgress(tvShow: DBTvShow): { progress: string, progressPercentage: number } {
    // Get the percentage first
    const totalEpisodes = tvShow.seasons.reduce((total, season) => total + season.episodes.length, 0);
    const completedEpisodes = tvShow.seasons.reduce((total, season) => 
        total + season.episodes.filter(episode => episode.watchStatus === WatchStatus.COMPLETED).length, 0);

    const progressPercentageEpisodes = (completedEpisodes / Math.max(totalEpisodes, 1)) * 100;

    // Return completedEpisodes / totalEpisodes if the show has only one season, otherwise calculate per season
    if (tvShow.seasons.length === 1) {
        return {
            progress: `${completedEpisodes} / ${totalEpisodes} episodes`,
            progressPercentage: progressPercentageEpisodes,
        };
    }

    const totalSeasons = tvShow.seasons.length; 
    const completedSeasons = tvShow.seasons.filter(IsSeasonCompleted).length;
    const progressPercentageSeasons = (completedSeasons / Math.max(totalSeasons, 1)) * 100;

    return {
        progress: `${completedSeasons} / ${totalSeasons} seasons completed`,
        progressPercentage: progressPercentageSeasons,
    };
}

/**
 * Calculates the progress of a subject based on its lectures.
 * @param subject Subject to calculate progress for.
 * @returns An object containing the progress string and percentage.
 * @note I should really rename subject to course...
 */
function CalculateSubjectProgress(subject: DBSubject): { progress: string, progressPercentage: number } {
    const totalLectures = subject.lectures.length;
    const completedLectures = subject.lectures.filter(lecture => lecture.watchStatus === WatchStatus.COMPLETED).length;

    const progressPercentage = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;

    return {
        progress: `${completedLectures} / ${totalLectures} lectures completed`,
        progressPercentage: progressPercentage,
    };
}

/**
 * Fetch function for retrieving items to watch.
 * @returns All movies and tvshows that have watchStatus === PLAN_TO_WATCH and all subjects that have toWatch === true.
 */
export default async function GetToWatchItems(): Promise<{entertainment: WatchListItem[], subjects: WatchListItem[]} | null> {
    try {
        // Fetch all movies first
        const moviesToWatch : WatchListItem[] = await prisma.movie.findMany({
            where: {
                watchStatus: WatchStatus.PLAN_TO_WATCH,
            }
        }).then(movies => movies.map((movie) : WatchListItem => ({
                // Does not have progress, wouldn't make much sense
                title: movie.title,
                shouldHaveThumbnail: true,
                shortDescription: movie.shortDescription,
                thumbnailUrl: movie.thumbnailUrl,
                url: `/movies/${movie.id}`,
        })));

        // Tv shows
        const tvShowsToWatch : WatchListItem[] = await prisma.show.findMany({
            where: {
                watchStatus: WatchStatus.PLAN_TO_WATCH,
            },

            // Need these to calculate progress
            include: {
                seasons: {
                    include: {
                        episodes: true
                    }
                },

                // To not bother with retyping
                genres: true
            }
        }).then(tvShows => tvShows.map((show) : WatchListItem => ({
            title: show.title,
            shouldHaveThumbnail: true,
            thumbnailUrl: show.thumbnailUrl,
            shortDescription: show.shortDescription,
            url: `/tv-shows/${show.id}`,
            // Get the rest from the utils
            ...CalculateTvShowProgress(show)
        })));

        // Finally fetch the subjects
        const subjectsToWatch : WatchListItem[] = await prisma.subject.findMany({
            where: {
                toWatch: true,
            },

            // For progress
            include: {
                lectures: {
                    include: {
                        notes: true
                    }
                }
            }
        }).then(subjects => subjects.map((subject) : WatchListItem => ({
            title: subject.title,
            shouldHaveThumbnail: false,
            url: `/subjects/${subject.id}`,
            ...CalculateSubjectProgress(subject)
        })));

        return {
            entertainment: [
                ...moviesToWatch,
                ...tvShowsToWatch
            ],

            subjects: subjectsToWatch
        }
    }

    catch (error) {
        console.error("Error fetching watchlist items: " + error);
        return null;
    }
}