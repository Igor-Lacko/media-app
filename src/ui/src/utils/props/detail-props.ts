import DetailFillable from "@shared/interface/detail-fillable";
import CardDisplayable from "@shared/interface/card-displayable";
import DetailHeaders from "utils/enum/detail-headers";
import ListProps from "./list-props";
import WatchStatus from "@shared/enum/watch-status";

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
    listProps?: ListProps;
    addTitle?: string;
    editTitle?: string;
    deleteTitle?: string;
    deleteFunction?: () => Promise<void>;
    hasMarkFavorite: boolean;
    markFavoriteFunction?: () => Promise<void>;
    rateTitle?: string;
    rateFunction?: (rating: number) => Promise<void>;
    watchStatusFunction?: (watchStatus: WatchStatus) => Promise<void>;
    setDescriptionFunction?: (description : string) => Promise<void>;
}

export default DetailProps;