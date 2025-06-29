/**
 * Props for modal components.
 */
export interface ModalProps {
    title: string;
    message: string;
    component?: React.ReactNode;
    onClose: () => void;
    classNames?: string;
}

export default ModalProps;