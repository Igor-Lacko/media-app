import WatchStatus from "@shared/enum/watch-status";
import {
	FaCheckCircle,
	FaPlayCircle,
	FaPauseCircle,
	FaClock,
} from "react-icons/fa";
import watchStatusAdapter from "utils/adapters/watch-status-adapter";

/**
 * Shows the watch status of a media item.
 * @param param0 Watch status and optional extra class names for styling.
 * @returns Component displaying the watch status.
 */
export default function DetailWatchStatus({
	watchStatus,
	extraClassNames,
}: {
	watchStatus: WatchStatus;
	extraClassNames?: string;
}) {
	const statusIcon =
		watchStatus === WatchStatus.COMPLETED ?
			<FaCheckCircle className="text-green-500 text-2xl" />
		: watchStatus === WatchStatus.WATCHING ?
			<FaPlayCircle className="text-blue-500 text-2xl" />
		: watchStatus === WatchStatus.NOT_WATCHED ?
			<FaPauseCircle className="text-gray-500 text-2xl" />
		: watchStatus === WatchStatus.PLAN_TO_WATCH ?
			<FaClock className="text-yellow-500 text-2xl" />
		:	null;

	return (
		<div
			className={
				"flex items-center justify-center space-x-2 "
				+ (extraClassNames || "")
			}
		>
			{statusIcon}
			<span className="text-gray-500 dark:text-gray-400 text-xl font-medium italic">
				{watchStatusAdapter(watchStatus)}
			</span>
		</div>
	);
}
