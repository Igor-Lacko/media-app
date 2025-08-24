import Note from "@shared/interface/models/note";
import classNames from "classnames";
import RoundedButton from "components/buttons/rounded-button";
import { useContext, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import SettingsContext from "context/settings-context";

/**
 * Part of the notebook used for, well, adding notes.
 * @param param0 Add handler, current timestamp, and additional class names.
 */
export default function NotebookAddNote({
	onAdd,
	timestamp,
	extraClassNames,
}: {
	onAdd: (note: Note) => void;
	timestamp: React.RefObject<number>;
	extraClassNames?: string;
}) {
	// Note content, timestamp is provided by the parent component.
	const [content, setContent] = useState("");

	// To either enable or disable markdown preview
	const { settings } = useContext(SettingsContext);

	return (
		<div
			className={
				"flex flex-col flex-grow items-start justify-center w-full "
				+ (extraClassNames || "")
			}
		>
			{/** Text area and error text */}
			<div
				className={
					"flex flex-col flex-1 items-start overflow-y-auto justify-center w-full h-auto"
				}
			>
				<MDEditor
					className={classNames(
						"w-full flex-1 px-5 outline-none text-black dark:text-gray-400",
					)}
					value={content}
					onChange={(value) => {
						if (value) {
							setContent(value);
						}
					}}
					hideToolbar
					preview={settings.showMarkdownPreview ? "live" : "edit"}
				/>
				{/** Submit button */}
				<div
					className={
						"flex items-center justify-end p-3 w-full h-auto border-t-1 border-gray-300 dark:border-gray-600"
					}
				>
					<RoundedButton
						text={"Add Note"}
						onClick={() => {
							if (content.trim() === "") {
								return;
							}

							onAdd({
								content: content,
								timestamp: timestamp.current,
							});
						}}
						extraClassNames={
							"bg-purple-500 text-white hover:bg-purple-600 dark:hover:bg-purple-700 dark:bg-purple-600"
						}
					/>
				</div>
			</div>
		</div>
	);
}
