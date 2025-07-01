import { useRef } from "react";
import AbstractModal from "./abstract-modal";
import RoundedButton from "components/buttons/rounded-button";
import ModalProps from "utils/props/modal-props";

/**
 * Modal that provides a text area for entering a description.
 * @param props Props for the modal including title, onSetText function, and onClose function.
 */
export default function TextAreaModal(props: ModalProps) {
    const description = useRef(props.initialText || "");

    return (
        <AbstractModal>
            <h2
                className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}
            >
                {props.title}
            </h2>
            <textarea
                className={"w-full h-40 p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200\
                        focus:outline-none focus:ring-2 focus:ring-purple-500 overflow-y-auto"}
                placeholder={"..."}
                defaultValue={props.initialText || ""}
                onChange={(e) => {
                    description.current = e.target.value;
                }}
            />
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                onClick={async () => {
                    props.onSetText && await props.onSetText(description.current);
                    props.onClose();
                }}
            />
        </AbstractModal>
    )
}