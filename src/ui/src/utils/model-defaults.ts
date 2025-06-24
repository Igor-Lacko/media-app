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
    rating: 0
};

export const defaultTvShow: TvShow = {
    title: "",
    genres: [Genre.ALL],
    seasons: [],
    watchStatus: WatchStatus.UNWATCHED,
    submediaString: "No known seasons :(("
}

export const defaultSubject: Subject = {
    title: "",
    lectures: [],
    submediaString: "No known lectures :((",
}

export const defaultSeason: Season = {
    seasonNumber: 1,
    episodes: [],
    description: "",
};

export const defaultEpisode: Episode = {
    seasonNumber: 1,
    episodeNumber: 1,
    title: "",
    watchStatus: WatchStatus.UNWATCHED,
    continueAt: 0
}

export const defaultLecture : Lecture = {
    title: "",
    watchStatus: WatchStatus.UNWATCHED,
    continueAt: 0,
    notes: []
}