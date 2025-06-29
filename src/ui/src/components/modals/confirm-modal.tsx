import RoundedButton from "components/buttons/rounded-button";
import ModalProps from "utils/props/modal-props";

/**
 * Returns a modal component with a confirm and close buttons.
 * @param props Title, onConfirm, onClose, classNames
 * @returns A modal component.
 */
export default function ConfirmModal(props: ModalProps) {
    return (
        <div
            className={"fixed inset-0 flex backdrop-blur-sm items-center justify-center z-50 \
                " + (props.extraClassNames || "")}
        >
            <div 
                className={"bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-md w-full"}
            >
                <h2 
                    className={"text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"}
                >
                    {props.title}
                </h2>
                {props.message && (
                    <p 
                        className={"text-gray-600 dark:text-gray-400 mb-4"}
                    >
                        {props.message}
                    </p>
                )}
                <div
                    className={"flex items-center justify-between space-x-4 mb-4"}
                >
                    <RoundedButton
                        text={"Confirm"}
                        extraClassNames={"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"}
                        onClick={props.onConfirm!}
                    />
                    <RoundedButton
                        text={"Close"}
                        extraClassNames={"bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"}
                        onClick={props.onClose}
                    />
                </div>
            </div>
        </div>
    )
}