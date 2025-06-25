import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";
import Episode from "./episode";

/**
 * Interface for tv show seasons.
 */
export interface Season extends CardDisplayable, DetailFillable {
    seasonNumber: number;
    episodes: Episode[];
}

export default Season;