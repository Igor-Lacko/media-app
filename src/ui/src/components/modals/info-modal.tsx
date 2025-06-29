import ModalProps from "utils/props/modal-props";

/**
 * Returns a modal component with child components inside it's body and a close button with an handler.
 * @param props Title, children, onClose, classNames
 * @returns A modal component.
 */
export default function InfoModal(props : ModalProps) {
    return (
        <div 
            className={"fixed inset-0 flex backdrop-blur-sm items-center justify-center z-50 \
                " + (props.extraClassNames || "")}
        >
            <div 
                className={"bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md"}
            >
                <h2 
                    className={"text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"}
                >
                    {props.title}
                </h2>
                <p 
                    className={"text-gray-600 dark:text-gray-400 mb-4"}
                >
                    {props.message!}
                </p>
                <button
                    onClick={props.onClose}
                    className={"px-4 py-2 bg-purple-800 text-gray-200 rounded-lg \
                        hover:bg-purple-600 transition-colors cursor-pointer"}
                >
                    Close
                </button>
            </div>
        </div>
    );
}