import ModalProps from "utils/props/modal-props";

/**
 * Hook to handle modal state and properties.
 * @param isError If the modal is for an error message.
 * @param message Error/success message to display in the modal.
 * @param close Close handler.
 */
export default function useModal(title : string, message : string, close : () => void, component? : React.ReactNode) : ModalProps {
    const props : ModalProps = {
        title: title,
        message: message,
        component: component,
        onClose: () => {
            close();
        },
    }

    return props;
}