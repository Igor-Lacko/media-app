import { useRef } from "react";
import AbstractModal from "./abstract-modal";
import RoundedButton from "components/buttons/rounded-button";
import { TextAreaModalProps } from "utils/props/other/modal-props";

/**
 * Modal that provides a text area for entering a description.
 * @param props Props for the modal including title, onSetText function, and onClose function.
 */
export default function TextAreaModal(props: TextAreaModalProps) {
	const description = useRef(props.initialText || "");

	return (
		<AbstractModal title={props.title}>
			<textarea
				className={
					"w-full h-40 p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200 text-black\
                        focus:outline-none focus:ring-2 focus:ring-purple-500 overflow-y-auto"
				}
				placeholder={"..."}
				defaultValue={props.initialText || ""}
				onChange={(e) => {
					description.current = e.target.value;
				}}
			/>
			<RoundedButton
				text={"Close"}
				extraClassNames={
					"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"
				}
				onClick={async () => {
					await props.onSetText(description.current);
					props.onClose();
				}}
			/>
		</AbstractModal>
	);
}
