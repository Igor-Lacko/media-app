import { EditBarProps } from "utils/props/edit-bar-props";
import AddButton from "./buttons/add-button";
import EditButton from "./buttons/edit-button";
import DeleteButton from "./buttons/delete-button"
import MarkFavoriteButton from "./buttons/mark-favorite-button";

/**
 * Edit bar component
 * @param props 
 */
export default function EditBar(props : EditBarProps) {
    return (
        <div
            className={"flex items-center w-full h-1/10 border-y-2 border-gray-400 dark:border-gray-600\
                    bg-gray-100 dark:bg-gray-700 px-5 space-x-5 justify-start"}
        >
            {props.addTitle && props.onAdd && <AddButton
                title={props.addTitle}
                onClick={props.onAdd}
            />}
            {props.editTitle && props.onEdit && <EditButton
                title={props.editTitle}
                onClick={props.onEdit}
            />}
            {props.deleteTitle && props.onDelete && <DeleteButton
                title={props.deleteTitle}
                onClick={props.onDelete}
            />}
            {props.hasMarkFavorite && props.onMarkFavorite && <MarkFavoriteButton
                onClick={props.onMarkFavorite}
                isFavorite={true}
            />}
        </div>
    )
}