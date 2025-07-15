/**
 * Props for form pages.
 */
export interface FormProps<T> {
	title: string;
	children: React.ReactNode;
	classNames?: string;
	ref: React.RefObject<T>;
	submitFunction: (ref: T) => Promise<boolean>;
	errorModalMessage: string;
	successModalMessage: string;
}

export default FormProps;
