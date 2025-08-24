import Lecture from "@shared/interface/models/lecture";
import DetailWatchStatus from "components/other/detail-watch-status";
import { LengthToTimeHeader } from "utils/adapters/length-to-time";
import DetailProps from "utils/props/detail/detail-props";

export default function LectureDetailHeader(props: DetailProps<Lecture>) {
	return (
		<div
			className={
				"flex items-center justify-between w-full h-auto max-h-80 mt-10 px-5"
			}
		>
			{/** Title, length */}
			<div
				className={
					"flex flex-col w-5/10 h-full items-start justify-start pb-3 space-y-2"
				}
			>
				<h1
					className={
						"text-4xl font-extrabold text-black dark:text-gray-400 tracking-wide font-[Roboto]"
					}
				>
					{props.title}
				</h1>
				<span
					className={
						"text-lg text-gray-500 dark:text-gray-400 italic"
					}
				>
					{props.model.length ?
						LengthToTimeHeader(props.model.length)
					:	"Unknown length"}
				</span>
			</div>
			{/** Watch status */}
			<div
				className={
					"flex flex-col items-end justify-center w-5/10 h-full"
				}
			>
				<DetailWatchStatus watchStatus={props.watchStatus!} />
			</div>
		</div>
	);
}
