import { useState } from "react";
import { FileBrowseModalProps } from "utils/props/other/modal-props";
import AbstractModal from "./abstract-modal";
import FileBrowseButton from "components/buttons/file-browse-button";
import RoundedButton from "components/buttons/rounded-button";

export default function FileBrowseModal(props: FileBrowseModalProps) {
	// Doesn't need to be state, since the button keeps that already
	const [path, setPath] = useState("");

	return (
		<AbstractModal title={props.title}>
			{props.message && (
				<p className={"text-gray-600 dark:text-gray-400 mb-4"}>
					{props.message}
				</p>
			)}
			<FileBrowseButton
				initial={path}
				allowed={props.allowed || "all"}
				onChange={(value: string) => {
					setPath(value);
				}}
			/>
			<div className={"flex items-center justify-end space-x-4 mt-4"}>
				<RoundedButton
					text={"Save"}
					extraClassNames={
						"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"
					}
					onClick={async () => {
						if (path !== "") {
							props.onSetText && (await props.onSetText(path));
							props.onClose();
						}
					}}
				/>
				<RoundedButton
					text={"Cancel"}
					extraClassNames={
						"bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
					}
					onClick={props.onClose}
				/>
			</div>
		</AbstractModal>
	);
}
