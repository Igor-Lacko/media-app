import ProgressBarProps from "utils/props/other/progress-bar-props";

/**
 * Returns a progress bar component.
 * @param props value, max, label
 * @returns Progress bar component
 */
export default function ProgressBar(props: ProgressBarProps) {
    const width = props.max === 0 ? 0 : (props.value / props.max) * 100;
    return (
        <div
            className={"flex flex-col items-center justify-center space-y-1 p-3 " + (props.extraClassNames || "")}
        >
            <span
                className={"flex text-gray-600 w-full h-3/4 dark:text-gray-300"}
            >
                {props.label}
            </span>
            <div
                className={"rounded-full flex w-full h-1/6 bg-gray-700"}
            >
                <div
                    className={"rounded-full h-full bg-yellow-500 z-20 dark:bg-yellow-400 flex items-center"}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    )
}