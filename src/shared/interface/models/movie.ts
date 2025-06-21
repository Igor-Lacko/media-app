import CardDisplayable from "./card-displayable";
import Genre from "shared/enum/genre";
import WatchStatus from "shared/enum/watch-status";

export interface Movie extends CardDisplayable {
    identifier?: number; // To not map to id, which is reserved for the database
	title: string;
    rating?: number;
    thumbnailUrl?: string;
    genres: Genre[];
    shortDescription?: string;
    description?: string;
    videoUrl?: string;
    length?: number;

}

export default Movie;