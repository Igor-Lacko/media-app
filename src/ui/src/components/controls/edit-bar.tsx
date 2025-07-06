import { EditBarProps } from "utils/props/control-elements/edit-bar-props";
import MarkFavoriteButton from "../buttons/mark-favorite-button";
import RoundedButton from "../buttons/rounded-button";
import { FaPlay } from "react-icons/fa";
import { FaCheckCircle, FaPencilAlt, FaPlus, FaStar, FaTrash } from "react-icons/fa";

/**
 * Edit bar component
 * @param props 
 */
export default function EditBar(props : EditBarProps) {
    console.log("EditBar rendered with props:", props);
    return (
        <div
            className={"flex items-center w-full h-1/10 border-b-2 border-gray-400 dark:border-gray-600\
                    px-5 justify-between pt-5 pb-10"}
        >
            <div
                className={"flex items-center justify-start space-x-5"}
            >
                {props.addTitle && props.onAdd && <RoundedButton
                    text={props.addTitle}
                    onClick={props.onAdd}
                    extraClassNames={"bg-green-500 dark:bg-green-700 hover:bg-green-600"}
                    icon={<FaPlus/>}
                />}
                {props.editTitle && props.onEdit && <RoundedButton
                    text={props.editTitle}
                    onClick={props.onEdit}
                    extraClassNames={"bg-blue-500 dark:bg-blue-700 hover:bg-blue-600"}
                    icon={<FaPencilAlt/>}
                />}
                {props.deleteTitle && props.onDelete && <RoundedButton
                    text={props.deleteTitle}
                    onClick={props.onDelete}
                    extraClassNames={"bg-red-500 dark:bg-red-700 hover:bg-red-600"}
                    icon={<FaTrash/>}
                />}
                {props.playTitle && props.onPlay && <RoundedButton
                    text={props.playTitle}
                    onClick={props.onPlay}
                    extraClassNames={"bg-purple-500 dark:bg-purple-700 hover:bg-purple-600"}
                    icon={<FaPlay/>}
                />}
                {props.onAddNote && <RoundedButton
                    text={"Add Note"}
                    onClick={props.onAddNote}
                    extraClassNames={"bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-700"}
                    icon={<FaPlus/>}
                />}
            </div>
            <div
                className={"flex items-center justify-start space-x-5"}
            >
                {props.onMarkFavorite && <MarkFavoriteButton
                    onClick={props.onMarkFavorite}
                    isFavorite={props.isFavorite!}
                />}
                {props.rateTitle && props.onRate && <RoundedButton
                    text={props.rateTitle}
                    onClick={props.onRate}
                    extraClassNames={"bg-orange-500 dark:bg-orange-600 hover:bg-orange-700"}
                    icon={<FaStar/>}
                />}
                {props.onSetDescription && <RoundedButton
                    text={"Set Description"}
                    onClick={props.onSetDescription}
                    extraClassNames={"bg-purple-500 dark:bg-purple-600 hover:bg-purple-700"}
                    icon={<FaPencilAlt/>}
                />}
                {props.onSetWatchStatus && <RoundedButton
                    text={"Set Watch Status"}
                    onClick={props.onSetWatchStatus}
                    extraClassNames={"bg-green-500 dark:bg-green-600 hover:bg-green-700"}
                    icon={<FaCheckCircle/>}
                />}
            </div>
        </div>
    )
}