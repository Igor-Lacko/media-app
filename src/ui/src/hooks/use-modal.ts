import ModalProps from "utils/interface/props/modal-props";

/**
 * Hook to handle modal state and properties.
 * @param isError If the modal is for an error message.
 * @param message Error/success message to display in the modal.
 * @param close Close handler.
 */
export default function useModal(isError : boolean, message : string, close : () => void) : ModalProps {
    const props : ModalProps = {
        title: isError ? "Error" : "Success",
        message: message,
        onClose: () => {
            close();
        },
    }

    return props;
}