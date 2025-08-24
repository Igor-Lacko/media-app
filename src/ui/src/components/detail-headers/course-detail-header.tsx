import Course from "@shared/interface/models/course";
import ProgressBar from "components/other/progress-bar";
import useProgressBar from "hooks/use-progress-bar";
import DetailProps from "utils/props/detail/detail-props";

/**
 * Header for a course model's detail page.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function CourseDetailHeader(props: DetailProps<Course>) {
	const progressBarProps = useProgressBar(props.model.lectures, "Lectures");

	return (
		<div
			className={
				"flex items-center justify-between w-full h-auto max-h-80 px-5"
			}
		>
			<div
				className={
					"flex flex-col w-5/10 h-full items-start justify-between pb-3"
				}
			>
				<h1
					className={
						"text-4xl font-extrabold text-black dark:text-gray-400 tracking-wide font-[Roboto]"
					}
				>
					{props.title}
				</h1>
				<ProgressBar
					{...{ ...progressBarProps, extraClassNames: "h-30" }}
				/>
			</div>
		</div>
	);
}
