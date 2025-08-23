import Course from "./interface/models/course";
import Movie from "./interface/models/movie"
import TvShow from "./interface/models/tv-show"

/**
 * All saved data, can be exported as JSON.
 */
export type DBData = {
	movies?: Movie[],
	shows?: TvShow[],
	courses?: Course[],
}

/**
 * Options for the prior type.
 */
export type DBOptions = Record<keyof DBData, boolean>;