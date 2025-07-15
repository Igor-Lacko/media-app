import CardDisplayable from "@shared/interface/card-displayable";

/**
 * Properties for a list component that displays a list of media items.
 */
export interface ListProps {
	path?: string;
	items: CardDisplayable[];
	showRating: boolean;
	showThumbnail: boolean;

	// For the not found list component
	notFoundTitle?: string;
	notFoundMessage?: string;
}

export default ListProps;
