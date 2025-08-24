import { useContext, useState } from "react";
import { MarkdownEditorModalProps } from "utils/props/other/modal-props";
import MDEditor from "@uiw/react-md-editor";
import SettingsContext from "context/settings-context";
import RoundedButton from "components/buttons/rounded-button";

/**
 * Modal for adding notes to lectures with markdown support.
 * @param props Title, onSetText function, and onClose function.
 */
export default function MarkdownModal(props: MarkdownEditorModalProps) {
	// Current text
	const [text, setText] = useState("");

	// Context (enable preview or not)
	const { settings } = useContext(SettingsContext);

	return (
		<div
			className={
				"fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50"
			}
		>
			<div
				className={
					"bg-white flex flex-col dark:bg-gray-800 rounded-lg shadow-lg\
                        pt-3 px-10 w-1/2 h-1/2 border border-gray-300 dark:border-gray-700 justify-start"
				}
			>
				<h2
					className={
						"text-xl font-semibold text-gray-800 dark:text-gray-200"
					}
				>
					{props.title}
				</h2>
				<MDEditor
					className={
						"w-full min-h-3/4 mt-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 text-black overflow-y-auto"
					}
					value={text}
					onChange={(value) => {
						if (value) {
							setText(value);
						}
					}}
					hideToolbar
					preview={settings.showMarkdownPreview ? "live" : "edit"}
				/>
				<div
					className={
						"flex items-center mt-3 justify-between p-3 w-full h-auto self-end"
					}
				>
					<RoundedButton
						text={"Close"}
						extraClassNames={
							"bg-purple-700 dark:bg-purple-800 hover:bg-purple-800"
						}
						onClick={props.onClose}
					/>
					<RoundedButton
						text={"Save"}
						extraClassNames={
							"bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-700 dark:bg-blue-600"
						}
						onClick={async () => {
							if (props.onSetText) {
								await props.onSetText(text);
							}
							props.onClose();
						}}
					/>
				</div>
			</div>
		</div>
	);
}
