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
    // The model to display
    model: T;

    // State vars
    rating?: number;
    description?: string;
    watchStatus?: WatchStatus;

    // Ref for video URL, does not need to be state since it's not displayed
    videoUrl?: React.RefObject<string>;

    // Sub media for the list below the header
    submedia?: CardDisplayable[];

    // Item title, mandatory
    title: string;

    // Whether to display the thumbnail and genres (todo remove)
    hasThumbnail: boolean;
    hasGenres: boolean;


    // Header type, used to determine which header to display
    headerType: DetailHeaders;

    // Props for the submedia list
    listProps?: ListProps;

    // Button titles
    playTitle?: string;
    addTitle?: string;
    editTitle?: string;
    deleteTitle?: string;
    rateTitle?: string;

    // Button functions
    deleteFunction?: () => Promise<boolean>;
    markFavoriteFunction?: () => Promise<boolean>;
    rateFunction?: (rating: number) => Promise<boolean>;
    watchStatusFunction?: (watchStatus: WatchStatus) => Promise<boolean>;
    setDescriptionFunction?: (description : string) => Promise<boolean>;
    setVideoUrlFunction?: (videoUrl: string) => Promise<boolean>;
}

export default DetailProps;