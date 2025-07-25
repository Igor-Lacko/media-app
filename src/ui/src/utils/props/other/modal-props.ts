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
	onSelectWatchStatus?: (watchStatus: WatchStatus) => Promise<void>;
	initialWatchStatus?: { key: string; value: WatchStatus };
	selectOptions?: { key: string; value: WatchStatus }[];

	// For slider modals
	onSliderEnter?: (value: number) => Promise<void>;
	initialValue?: number;
	maxValue?: number;
	jump?: number;
	precision?: number;

	// For text area/filepath modals
	onSetText?: (text: string) => Promise<void>;
	initialText?: string;

	// Strictly for file browse modals
	allowed?: string;

	// For navigate modals
	options?: { title: string; onClick: () => void }[];

	// Each one also has this
	onClose: () => void;

	// Extra for styling
	extraClassNames?: string;
}

export default ModalProps;
