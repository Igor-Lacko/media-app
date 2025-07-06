import ProgressBarProps from "utils/props/other/progress-bar-props";
import CardDisplayable from "@shared/interface/card-displayable";
import WatchStatus from "@shared/enum/watch-status";

/**
 * Returns progress bar props from a list of items which can be completed.
 * @param items Items to calculate progress from.
 * @param title Value/Max Title completed.
 * @returns Progress bar props containing value, max, and label.
 */
export default function useProgressBar(items : CardDisplayable[], title : string) : ProgressBarProps {
    const value = items.filter(item => item.watchStatus === WatchStatus.WATCHED).length;
    const max = items.length;
    const label = `${value}/${max} ${title} completed`;
    return {
        value: value,
        max: max,
        label: label
    };
}