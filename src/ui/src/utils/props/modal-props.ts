/**
 * Props for modal components.
 */
export interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    classNames?: string;
}

export default ModalProps;