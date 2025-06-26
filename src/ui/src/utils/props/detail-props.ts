import DetailFillable from "@shared/interface/detail-fillable";
import CardDisplayable from "@shared/interface/card-displayable";
import DetailHeaders from "utils/enum/detail-headers";
import { EditBarProps } from "./edit-bar-props";
import ListProps from "./list-props";

/**
 * Interface for detail properties.
 * Includes the model to display, it's sub-models and which properties of the model to display.
 */
export interface DetailProps<T extends DetailFillable>{
    model: T;
    submedia?: CardDisplayable[];
    title: string;
    hasThumbnail: boolean;
    hasGenres: boolean;
    hasDescription: boolean;
    playable: boolean;
    canBeMarkedFavorite: boolean;
    headerType: DetailHeaders;
    hasWatchStatus: boolean;
    editBarProps: EditBarProps;
    listProps?: ListProps;
}

export default DetailProps;