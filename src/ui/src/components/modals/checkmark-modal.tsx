import RoundedButton from "components/buttons/rounded-button";
import { useState } from "react";
import { CheckMarkModalProps } from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";
import Toggle from "components/buttons/toggle";

/**
 * Returns a modal component with checkboxes for each option passed to it.
 * @param props Title, options, onConfirm, onClose, classNames
 * @returns A modal component.
 */
export default function CheckmarkModal(props: CheckMarkModalProps) {
	const [options, setOptions] = useState(props.options);
	const [errorMessage, setErrorMessage] = useState("");

	return (
		<AbstractModal title={props.title}>
			{/** Toggles */}
			<ul className={"flex flex-col"}>
				{options.map((o, index) => (
					<li
						key={index}
						className={
							"flex items-center p-2 w-full justify-between"
						}
					>
						<span className={"text-black dark:text-gray-400"}>
							{o.title}
						</span>
						<Toggle
							checked={o.checked}
							onChange={(isChecked) => {
								const newOptions = [...options];
								newOptions[index].checked = isChecked;
								setOptions(newOptions);
							}}
						/>
					</li>
				))}
			</ul>
			{/** Error text */}
			<div className={"h-6 text-red-600 text-sm text-center mb-2"}>
				{errorMessage !== "" && errorMessage}
			</div>
			<div
				className={"flex items-center w-full justify-between px-4 mb-2"}
			>
				<RoundedButton
					text={"Confirm"}
					onClick={async () => {
						if (
							props.someNeeded &&
							!options.some((o) => o.checked)
						) {
							setErrorMessage(
								"Please select at least one option to continue.",
							);
						} else {
							setErrorMessage("");
							await props.onConfirm(options);
							props.onClose();
						}
					}}
					extraClassNames={"bg-purple-600 hover:bg-purple-700 w-1/2"}
				/>
				<RoundedButton
					text={"Close"}
					onClick={props.onClose}
					extraClassNames={
						"bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
					}
				/>
			</div>
		</AbstractModal>
	);
}
