import RoundedButton from "components/buttons/rounded-button";
import ModalProps from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";

/**
 * Returns a modal with 2 buttons.
 * @param props Title, onClose, paths.
 */
export default function TwoButtonsModal(props: ModalProps) {
    return (
        <AbstractModal>
            <div
                className={"flex items-center justify-center"}
            >
                <h2
                    className={"text-xl font-semibold text-gray-800 dark:text-gray-200"}
                >
                    {props.title}
                </h2>
            </div>
            <div
                className={"flex items-center justify-center space-x-20 mt-4 mb-8"}
            >
                {props.options && props.options.map((option, index) => (
                    <RoundedButton
                        key={index}
                        text={option.title}
                        extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                        onClick={() => {
                            option.onClick();
                            props.onClose();
                        }}
                    />
                ))}
            </div>
            <RoundedButton
                text={"Close"}
                extraClassNames={"bg-gray-500 dark:bg-gray-600 hover:bg-gray-600"}
                onClick={props.onClose}
            />
        </AbstractModal>
    )
}