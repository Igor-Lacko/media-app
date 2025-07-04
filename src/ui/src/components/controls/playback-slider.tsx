import { useEffect, useState } from "react";
import PlaybackSliderProps from "utils/props/playback-slider-props";

/**
 * Playback slider component for controlling video position.
 * @param props Max (video length), current value, onChange handler.
 */
export default function PlaybackSlider(props : PlaybackSliderProps) {
    return (
        <div
            className={"relative w-full h-1 bg-gray-400 cursor-pointer " + (props.extraClassNames || "")}
        >
            <div
                className={"absolute top-0 left-0 h-full bg-blue-500"}
                style={{ width: `${(props.duration) ? (props.value / props.duration) * 100 : 0}%` }}
            />
            <input
                type="range"
                min="0"
                max={props.duration}
                step="1" // Because seconds
                value={props.value}
                onChange={(event) => {
                    props.setValue(parseFloat(event.target.value));
                }}
                className={"absolute w-full h-1 appearance-none cursor-pointer"}
            />
        </div>
    )
}