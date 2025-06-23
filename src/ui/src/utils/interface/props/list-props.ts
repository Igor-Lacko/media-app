import CardDisplayable from "@shared/interface/card-displayable";

export interface ListProps {
    path: string;
    items: CardDisplayable[];
    showRating: boolean;
    showThumbnail: boolean;
}

export default ListProps;