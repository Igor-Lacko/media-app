import { useState } from "react";

/**
 * Toggle component that can be used to switch between two states.
 * @param checked Initial state of the toggle.
 * @param onChange Called when the toggle is changed.
 * @note From https://flowbite.com/docs/forms/toggle/
 */
export default function Toggle({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: (checked: boolean) => void;
}) {
	const [isChecked, setIsChecked] = useState(checked);
	const onToggle = () => {
		setIsChecked(!isChecked);
		onChange(!isChecked);
	};

	return (
		<label className={"inline-flex items-center cursor-pointer"}>
			<input
				type="checkbox"
				className={"sr-only peer"}
				checked={isChecked}
				onChange={onToggle}
			/>
			<div
				className={
					"relative w-11 h-6 bg-gray-200 rounded-full peer \
                dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full \
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] \
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all \
                dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
				}
			/>
		</label>
	);
}
