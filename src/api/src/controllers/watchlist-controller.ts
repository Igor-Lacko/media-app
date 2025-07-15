import WatchListItem from "@shared/interface/watchlist-item";
import prisma from "db/db";
import { WatchStatus } from "generated/prisma/enums";
import { DBTvShow } from "adapters/tv-shows";
import { DBSeason } from "adapters/seasons";
import { DBCourse } from "adapters/courses";

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
 * @param inEpisodes Whether to return the progress in episodes or seasons.
 * @returns An object containing the progress string and percentage.
 */
function CalculateTvShowProgress(tvShow: DBTvShow, inEpisodes: boolean): { progress: string, progressPercentage: number } {
    // Get the percentage first
    const totalEpisodes = tvShow.seasons.reduce((total, season) => total + season.episodes.length, 0);
    const completedEpisodes = tvShow.seasons.reduce((total, season) => 
        total + season.episodes.filter(episode => episode.watchStatus === WatchStatus.COMPLETED).length, 0);

    const progressPercentageEpisodes = (completedEpisodes / Math.max(totalEpisodes, 1)) * 100;

    // Return completedEpisodes / totalEpisodes if the show has only one season, otherwise calculate per season
    if (tvShow.seasons.length === 1 || inEpisodes) {
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
 * Calculates the progress of a course based on its lectures.
 * @param course course to calculate progress for.
 * @returns An object containing the progress string and percentage.
 * @note I should really rename course to course...
 */
function CalculateCourseProgress(course: DBCourse): { progress: string, progressPercentage: number } {
    const totalLectures = course.lectures.length;
    const completedLectures = course.lectures.filter(lecture => lecture.watchStatus === WatchStatus.COMPLETED).length;

    const progressPercentage = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;

    return {
        progress: `${completedLectures} / ${totalLectures} lectures completed`,
        progressPercentage: progressPercentage,
    };
}

function TvShowToWatchListItem(tvShow: DBTvShow, progressInEpisodes?: boolean): WatchListItem {
    return {
        title: tvShow.title,
        shouldHaveThumbnail: true,
        thumbnailUrl: tvShow.thumbnailUrl,
        shortDescription: tvShow.shortDescription,
        url: `/tv-shows/${tvShow.id}`,
        
        // Calculate progress if requested
        ... (progressInEpisodes !== null && progressInEpisodes !== undefined ? CalculateTvShowProgress(tvShow, progressInEpisodes) : {} )
    }
}

/**
 * Fetch function for retrieving items for a watchlist (so items that are being currently watched or planned to be watched).
 * If returning items that are currently being watched, returns only tv shows with status WATCHING.
 * @param currentlyWatched If true, fetches items that are currently being watched, otherwise fetches items that are planned to be watched.
 * @returns An object containing an array of the requested items or null in case of an error.
 */
export default async function GetWatchlistItems(currentlyWatched: boolean): Promise<{entertainment: WatchListItem[], courses: WatchListItem[]} | null> {
    const watchStatus = currentlyWatched ? WatchStatus.WATCHING : WatchStatus.PLAN_TO_WATCH;
    try {
        // Fetch all movies first (if requested)
        let moviesToWatch : WatchListItem[] = [];

        if (watchStatus === WatchStatus.PLAN_TO_WATCH) {
            moviesToWatch = await prisma.movie.findMany({
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
        }

        // Fetch progress display setting
        const inEpisodes = await prisma.settings.findFirst({
            select: {
                episodeProgressInEpisodes: true,
            }
        }).then(settings => settings?.episodeProgressInEpisodes ?? false);

        // Tv shows
        const tvShowsToWatch : WatchListItem[] = await prisma.show.findMany({
            where: {
                watchStatus: watchStatus,
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
        }).then(tvShows => tvShows.map((show) : WatchListItem => TvShowToWatchListItem(show, watchStatus === WatchStatus.WATCHING ? inEpisodes : undefined)));

        // Finally fetch the courses (if fetching to watch items)
        let coursesToWatch : WatchListItem[] = [];

        if (watchStatus === WatchStatus.PLAN_TO_WATCH) {
            coursesToWatch = await prisma.course.findMany({
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
            }).then(courses => courses.map((course) : WatchListItem => ({
                title: course.title,
                shouldHaveThumbnail: false,
                url: `/courses/${course.id}`,
                ...CalculateCourseProgress(course)
            })));
        }

        return {
            entertainment: [
                ...moviesToWatch,
                ...tvShowsToWatch
            ],

            courses: coursesToWatch
        }
    }

    catch (error) {
        return null;
    }
}