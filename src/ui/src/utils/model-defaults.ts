import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import Subject from "@shared/interface/models/subject";
import Season from "@shared/interface/models/season";
import Episode from "@shared/interface/models/episode";
import Lecture from "@shared/interface/models/lecture";
import { Genre } from "@shared/enum/genre";
import { WatchStatus } from "@shared/enum/watch-status";

/**
 * This file contains default values for all models.
 */

export const defaultMovie: Movie = {
    title: "",
    genres: [Genre.ALL],
    watchStatus: WatchStatus.UNWATCHED,
    continueAt: 0,
    length: 0,
    rating: 0,
    isFavorite: false,
};

export const defaultTvShow: TvShow = {
    title: "",
    genres: [Genre.ALL],
    seasons: [],
    watchStatus: WatchStatus.UNWATCHED,
    isFavorite: false,
}

export const defaultSubject: Subject = {
    title: "",
    lectures: [],
}

export function defaultSeason(seasonNumber: number = -1, showId: number = 0) : Season {
    return {
        showId: showId,
        seasonNumber: seasonNumber,
        episodes: [],
        description: "",
    };
}

export function defaultEpisode(episodeNumber: number = -1, seasonNumber: number = -1, seasonId: number = 0) : Episode {
    return {
        seasonId: seasonId,
        episodeNumber: episodeNumber,
        seasonNumber: seasonNumber,
        title: "",
        watchStatus: WatchStatus.UNWATCHED,
        continueAt: 0,
    };
}

export function defaultLecture(lectureNumber: number = 1, subjectId: number = 0) : Lecture{
    return {
        subjectId: subjectId,
        lectureNumber: lectureNumber,
        title: "",
        notes: [],
        continueAt: 0,
        watchStatus: WatchStatus.UNWATCHED
    };
}