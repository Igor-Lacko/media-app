import CardDisplayable from "./card-displayable";

export interface DetailFillable extends CardDisplayable {
	videoUrl?: string;
	length?: number;
	description?: string;
	continueAt?: number;
	isFavorite?: boolean;
}

export default DetailFillable;
