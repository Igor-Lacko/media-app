import DetailFillable from "@shared/interface/detail-fillable";
import CardDisplayable from "@shared/interface/card-displayable";
import DetailHeaders from "utils/enum/detail-headers";

/**
 * Interface for detail properties.
 * Includes the model to display, it's sub-models and which properties of the model to display.
 */
export interface DetailProps {
    model: DetailFillable;
    submedia?: CardDisplayable[];
    title: string;
    hasThumbnail: boolean;
    hasGenres: boolean;
    hasDescription: boolean;
    playable: boolean;
    hasSubmedia: boolean;
    canBeMarkedFavorite: boolean;
    headerType: DetailHeaders;
}

export default DetailProps;