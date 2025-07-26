/**
 * Properties for the EditBar component (allows adding submedia, editing, deleting, and marking as favorite).
 */
export interface EditBarProps {
	// Button titles
	addTitle?: string;
	editTitle?: string;
	deleteTitle?: string;
	isFavorite?: boolean;
	isInWatchlist?: boolean;
	rateTitle?: string;
	playTitle?: string;
	
	// These mostly open modals which have buttons to do the __actual__ update
	onAdd?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
	onMarkFavorite?: () => void;
	onToggleWatchlist?: () => void;
	onPlay?: () => void;
	onAddNote?: () => void;
	onSetDescription?: () => void;
	onRate?: () => void;
	onSetWatchStatus?: () => void;
	onCompleteEpisodes?: () => void;
}

export default EditBarProps;
