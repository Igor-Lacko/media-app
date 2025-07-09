import ProgressBarProps from "utils/props/other/progress-bar-props";

/**
 * Returns a progress bar component.
 * @param props value, max, label
 * @returns Progress bar component
 */
export default function ProgressBar(props: ProgressBarProps) {
    const width = props.percentage ? props.percentage : props.max === 0 ? 0 : (props.value! / props.max!) * 100;
    console.log("props: ", props);
    console.log("width: ", width);
    return (
        <div
            className={
                "flex flex-col items-center justify-center space-y-2 p-4 " + (props.extraClassNames || "")
            }
        >
            <span
                className={
                    "flex text-gray-500 w-full dark:text-gray-300 text-md font-semibold"
                }
            >
                {props.label}
            </span>
            <div
                className={"rounded-full flex bg-gray-400 w-full shadow-inner min-h-1.5 max-h-2"}
            >
                <div
                    className={
                        "rounded-full min-h-1.5 max-h-2 h-full bg-yellow-500"
                    }
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}