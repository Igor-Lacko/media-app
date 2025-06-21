import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";
import Season from "./season";

/**
 * Interface representing a TV show.
 */
export interface TvShow extends CardDisplayable, DetailFillable {
    seasons: Season[];
    nofFinishedSeasons: number;
}

export default TvShow;