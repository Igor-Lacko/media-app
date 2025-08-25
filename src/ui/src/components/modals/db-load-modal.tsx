import { LoadDBModalProps } from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";
import FileBrowseButton from "components/buttons/file-browse-button";
import { useState } from "react";
import classNames from "classnames";
import RoundedButton from "components/buttons/rounded-button";
import { IsValidFile } from "electron/electron-api";

/**
 * Specific modal component to load a DB from JSON.
 * @param props Contains the handler function.
 */
export default function LoadDBModal(props: LoadDBModalProps) {
	const [filepath, setFilepath] = useState("");
	const [overwrite, setOverwrite] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	return (
		<AbstractModal title={props.title}>
			{/** File browse button */}
			<FileBrowseButton
				initial={filepath}
				onChange={(file) => setFilepath(file)}
				allowed={".json"}
				extraClassnames={"mt-5 mb-1"}
			/>

			<div className={"h-6 text-red-600 text-sm text-center mb-5"}>
				{errorMessage !== "" && errorMessage}
			</div>

			{/** Append/overwrite choice */}
			<div className={"flex items-center my-5 px-4 gap-3 items-center"}>
				{[
					{
						disabled: !overwrite,
						text: "Add to existing data",
						onClick: () => setOverwrite(false),
					},
					{
						disabled: overwrite,
						text: "Overwrite existing data",
						onClick: () => setOverwrite(true),
					},
				].map((btn, index) => (
					<button
						key={index}
						onClick={btn.onClick}
						disabled={btn.disabled}
						className={classNames(
							"flex items-center p-2 w-1/2 transition-colors duration-300 text-black dark:text-gray-400 rounded-lg",
							{
								"bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700":
									!btn.disabled,
								"bg-gray-200 dark:bg-gray-700": btn.disabled,
							},
						)}
					>
						{btn.text}
					</button>
				))}
			</div>

			{/** Close/confirm buttons */}
			<div
				className={"flex items-center w-full justify-between px-4 mb-2 mt-5"}
			>
				<RoundedButton
					text={"Confirm"}
					onClick={async () => {
						if (!filepath) {
							setErrorMessage("Please select a file to load.");
							return;
						} else if (!(await IsValidFile(filepath))) {
							setErrorMessage(
								`File ${filepath} doesn't exist or is not a JSON file.`,
							);
							return;
						} else {
							await props.onConfirm(filepath, overwrite);
							props.onClose();
						}
					}}
					extraClassNames={"bg-purple-600 hover:bg-purple-700 w-1/2"}
				/>
				<RoundedButton
					text={"Cancel"}
					onClick={props.onClose}
					extraClassNames={"bg-gray-600 hover:bg-gray-700 w-1/2 ml-4"}
				/>
			</div>
		</AbstractModal>
	);
}
