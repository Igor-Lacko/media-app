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
    rating?: number;
    description?: string;
    watchStatus?: WatchStatus;
    submedia?: CardDisplayable[];
    title: string;
    hasThumbnail: boolean;
    hasGenres: boolean;
    playable: boolean;
    headerType: DetailHeaders;
    listProps?: ListProps;
    addTitle?: string;
    editTitle?: string;
    deleteTitle?: string;
    deleteFunction?: () => Promise<boolean>;
    markFavoriteFunction?: () => Promise<boolean>;
    rateTitle?: string;
    rateFunction?: (rating: number) => Promise<boolean>;
    watchStatusFunction?: (watchStatus: WatchStatus) => Promise<boolean>;
    setDescriptionFunction?: (description : string) => Promise<boolean>;
}

export default DetailProps;