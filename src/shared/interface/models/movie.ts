import CardDisplayable from "../card-displayable";
import DetailFillable from "../detail-fillable";
import Genre from "shared/enum/genre";

export interface Movie extends CardDisplayable, DetailFillable {
}

export default Movie;