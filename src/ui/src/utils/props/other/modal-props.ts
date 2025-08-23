/**
 * Base props for all modal components.
 */
type ModalProps = {
	title: string;
	onClose: () => void;
	extraClassNames?: string;
}

/**
 * For confirm modals.
 */
export type ConfirmModalProps = ModalProps & {
	message: string;
	onConfirm: () => void;
}

/**
 * For modals with multiple options with one to select.
 */
export type EnumModalProps<T> = ModalProps & {
	selectOptions: { key: string; value: T }[];
	onSelect: (value: T) => Promise<void>;
	initialSelection: { key: string; value: T };
}

/**
 * For modals which open file dialogs.
 */
export type FileBrowseModalProps = ModalProps & {
	message: string;
	allowed: string;
	onSetText: (text: string) => Promise<void>;
}

/**
 * For modals which just show info.
 */
export type InfoModalProps = ModalProps & {
	message: string;
}

/**
 * For the markdown editor modal.
 */
export type MarkdownEditorModalProps = ModalProps & {
	onSetText: (text: string) => Promise<void>;
}

/**
 * For modals which allow a choice from 2 buttons.
 */
export type TwoButtonsModalProps = ModalProps & {
	options: { title: string; onClick: () => void }[];
}

/**
 * For slider modals.
 */
export type SliderModalProps = ModalProps & {
	onSliderEnter: (value: number) => Promise<void>;
	message?: string;
	initialValue?: number;
	maxValue: number;
	jump?: number;
	precision?: number;
}

/**
 * For text area modals.
 */
export type TextAreaModalProps = ModalProps & {
	onSetText: (text: string) => Promise<void>;
	initialText?: string;
}