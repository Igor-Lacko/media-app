import DropdownCheckbox from "components/dropdowns/dropdown-checkbox";
import DropdownProps from "utils/props/control-elements/dropdown-props";

/**
 * Form option for a dropdown with checkboxes. (E.g. movie genres)
 * @param props Props for the dropdown checkbox component.
 */
export default function DropdownCheckboxOption({
	props,
	title,
	extraClassNames,
}: {
	props: DropdownProps;
	title: string;
	extraClassNames?: string;
}) {
	return (
		<div
			className={
				"flex-col w-full h-1/10 ml-8 items-start justify-center p-4 space-y-4 "
				+ (extraClassNames || "")
			}
		>
			<span
				className={
					"text-lg flex font-semibold items-center h-full text-gray-800 dark:text-gray-400"
				}
			>
				{title}
			</span>
			<DropdownCheckbox {...props} />
		</div>
	);
}
