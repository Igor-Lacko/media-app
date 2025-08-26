import RoundedButton from "components/buttons/rounded-button";
import { ConfirmModalProps } from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";

/**
 * Returns a modal component with a confirm and close buttons.
 * @param props Title, onConfirm, onClose, classNames
 * @returns A modal component.
 */
export default function ConfirmModal(props: ConfirmModalProps) {
	return (
		<AbstractModal title={props.title}>
			{props.message && (
				<p className={"text-gray-600 dark:text-gray-400 mb-4"}>
					{props.message}
				</p>
			)}
			<div className={"flex items-center justify-between space-x-4 mb-4"}>
				<RoundedButton
					text={"Confirm"}
					extraClassNames={
						"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800 w-1/2"
					}
					onClick={props.onConfirm}
				/>
				<RoundedButton
					text={"Close"}
					extraClassNames={
						"bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 w-1/2"
					}
					onClick={props.onClose}
				/>
			</div>
		</AbstractModal>
	);
}
