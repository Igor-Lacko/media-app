import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import Course from "@shared/interface/models/course";
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
	watchStatus: WatchStatus.NOT_WATCHED,
	isFavorite: false,
	rating: 0,
};

export const defaultTvShow: TvShow = {
	title: "",
	genres: [Genre.ALL],
	seasons: [],
	watchStatus: WatchStatus.NOT_WATCHED,
	isFavorite: false,
	rating: 0,
};

export const defaultCourse: Course = {
	title: "",
	lectures: [],
	toWatch: false,
};

export function defaultSeason(
	seasonNumber: number = -1,
	showId: number = 0,
): Season {
	return {
		seasonNumber: seasonNumber,
		episodes: [],
		rating: 0,
	};
}

export function defaultEpisode(
	episodeNumber: number = -1,
	seasonNumber: number = -1,
	seasonId: number = 0,
): Episode {
	return {
		episodeNumber: episodeNumber,
		seasonNumber: seasonNumber,
		title: "",
		watchStatus: WatchStatus.NOT_WATCHED,
		rating: 0,
	};
}

export function defaultLecture(
	lectureNumber: number = 1,
	CourseId: number = 0,
): Lecture {
	return {
		lectureNumber: lectureNumber,
		title: "",
		notes: [],
		watchStatus: WatchStatus.NOT_WATCHED,
	};
}
