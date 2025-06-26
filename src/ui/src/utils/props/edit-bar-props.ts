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
    hasMarkFavorite: boolean;
    onMarkFavorite?: () => void;
}