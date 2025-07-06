/**
 * Properties for the EditBar component (allows adding submedia, editing, deleting, and marking as favorite).
 */
export interface EditBarProps {
    addTitle?: string;
    onAdd?: () => void;
    editTitle?: string;
    onEdit?: () => void;
    deleteTitle?: string;
    onDelete?: () => void;
    isFavorite?: boolean;
    onMarkFavorite?: () => void;
    rateTitle?: string;
    playTitle?: string;
    onPlay?: () => void;
    onAddNote?: () => void;
    onSetDescription?: () => void;
    onRate?: () => void;
    onSetWatchStatus?: () => void;
}

export default EditBarProps;