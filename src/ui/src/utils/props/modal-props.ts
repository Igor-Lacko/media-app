export interface ModalProps {
    title: string;
    message: string;
    onClose: () => void;
    classNames?: string;
}

export default ModalProps;