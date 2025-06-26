import ProgressBarProps from "utils/props/progress-bar-props";

/**
 * Returns a progress bar component.
 * @param props value, max, label
 * @returns Progress bar component
 */
export default function ProgressBar(props: ProgressBarProps) {
    const width = `w-${parseInt(((props.value / props.max) * 100).toString())}/100`;
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
                    className={`rounded-full h-full bg-yellow-500 dark:bg-yellow-400 ${width} flex items-center`}
                />
            </div>
        </div>
    )
}