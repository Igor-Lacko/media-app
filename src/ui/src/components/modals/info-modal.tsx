import RoundedButton from "components/buttons/rounded-button";
import { InfoModalProps } from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";

/**
 * Returns a modal component with child components inside it's body and a close button with an handler.
 * @param props Title, children, onClose, classNames
 * @returns A modal component.
 */
export default function InfoModal(props: InfoModalProps) {
    return (
        <AbstractModal>
            <h2
                className={"text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"}
            >
                {props.title}
            </h2>
            <p
                className={"text-gray-600 dark:text-gray-400 mb-4"}
            >
                {props.message}
            </p>
            <RoundedButton
                onClick={props.onClose}
                text={"Close"}
                extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
            />
        </AbstractModal>
    );
}