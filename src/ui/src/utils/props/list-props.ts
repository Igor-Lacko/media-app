import CardDisplayable from "@shared/interface/card-displayable";

/**
 * Properties for a list component that displays a list of media items.
 */
export interface ListProps {
    path: string;
    items: CardDisplayable[];
    showRating: boolean;
    showThumbnail: boolean;
}

export default ListProps;