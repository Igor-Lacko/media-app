import ModalProps from "utils/props/modal-props";

/**
 * Render a modal component with a title, message, and close button.
 * @param props Title, message, onClose, classNames
 * @returns A modal component.
 */
export default function Modal(props : ModalProps) {
    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 ${props.classNames || ""}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{props.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{props.message}</p>
                <button
                    onClick={props.onClose}
                    className="px-4 py-2 bg-purple-800 text-gray-200 rounded-lg \
                        hover:bg-purple-600 transition-colors cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
