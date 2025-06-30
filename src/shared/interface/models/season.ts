import DetailFillable from "../detail-fillable";
import Episode from "./episode";

/**
 * Interface for tv show seasons.
 */
export interface Season extends DetailFillable {
    seasonNumber: number;
    episodes: Episode[];
}

export default Season;