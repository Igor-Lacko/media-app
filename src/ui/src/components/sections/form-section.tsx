/**
 * Section in a form, with a title and children.
 * @param param0 Title and child elements
 */
export default function FormSection({
	children,
	title,
	classNames,
}: {
	children: React.ReactNode;
	title: string;
	classNames?: string;
}) {
	return (
		<div
			className={
				"flex w-full flex-col items-start pb-10 justify-start border-t\
                border-gray-300 dark:border-gray-600 " + (classNames || "")
			}
		>
			<h2
				className={
					"text-3xl font-semibold text-gray-700 dark:text-gray-400 mt-10 mb-5 ml-7"
				}
			>
				{title}
			</h2>
			<div
				className={
					"flex w-full flex-col items-start h-auto justify-between"
				}
			>
				{children}
			</div>
		</div>
	);
}
