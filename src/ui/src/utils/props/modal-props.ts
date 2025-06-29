import WatchStatus from "@shared/enum/watch-status";

/**
 * Props for modal components.
 */
export interface ModalProps {
    // Each one has this
    title: string;

    // For info modals
    message?: string;

    // For close or confirm modals
    onConfirm?: () => void;

    // For watch status select modals
    onSelectWatchStatus?: (watchStatus : WatchStatus) => Promise<void>;
    initialWatchStatus?: { key: string; value: WatchStatus };
    selectOptions?: { key: string; value: WatchStatus }[];

    // For rating select modals
    onSelectRating?: (rating: number) => Promise<void>;
    initialRating?: number;

    // For text area modals
    onSetDescription?: (description: string) => Promise<void>;

    // Each one also has this
    onClose: () => void;

    // Extra for styling
    extraClassNames?: string;
}

export default ModalProps;