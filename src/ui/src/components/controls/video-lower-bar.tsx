import classNames from "classnames";
import { useState } from "react";
import { FaPause, FaPlay, FaForward, FaBackward, FaFastForward, FaFastBackward } from "react-icons/fa";
import VideoLowerBarProps from "utils/props/video-lower-bar-props";

/**
 * Lower bar for the video player with play, pause, forward, and backward controls.
 * @param props Include button handlers, isVisible ref and extra class names.
 */
export default function VideoLowerBar(props : VideoLowerBarProps) {
    const [speed, setSpeed] = useState(props.currentSpeed || 1.0);
    return (
        <div
            className={classNames(
                "absolute overflow-hidden flex bottom-0 left-0 items-center justify-start w-full py-5 px-5 \
                transition-all bg-black border-t border-red-500 z-50 duration-500 ease-in-out backdrop-blur-md " + (props.extraClassNames || ""),
                {
                    "opacity-70": props.isVisible,
                    "opacity-0": !props.isVisible,
                }
            )}
        >
            {/** Play, Pause */}
            <div
                className={"flex items-center justify-start text-gray-500 w-1/10 h-full"}
            >
                {props.isPlaying ?
                    <FaPause
                        className={"text-gray-500 ml-5 text-2xl cursor-pointer hover:text-gray-600"}
                        onClick={props.onSwitchPlaying} 
                    /> : 
                    <FaPlay
                        className={"text-gray-500 ml-5 text-2xl cursor-pointer hover:text-gray-600"}
                        onClick={props.onSwitchPlaying}
                    />
                }
            </div>
            {/** Forward 10 seconds/go back 10 seconds */}
            <div
                className={"flex items-center justify-start w-2/10 h-full space-x-5 text-gray-500 text-lg"}
            >
                Forward/Backward
                <FaBackward
                    className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600 ml-5"}
                    onClick={props.onGoBack}
                />
                <FaForward
                    className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600"}
                    onClick={props.onGoForward}
                />
            </div>
            {/** Increase/decrease playback speed */}
            <div
                className={"flex items-center justify-start w-2/10 h-full space-x-5 text-gray-500 text-lg"}
            >
                Playback speed: {speed.toFixed(2) || "1.00"}x
                <FaFastBackward
                    className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600 ml-5"}
                    onClick={() => {
                        props.onDecreaseSpeed();
                        setSpeed((prev) => Math.max(0.25, prev - 0.25));
                    }}
                />
                <FaFastForward 
                    className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600"}
                    onClick={() => {
                        props.onIncreaseSpeed();
                        setSpeed((prev) => prev + 0.25);
                    }}
                />
            </div>
        </div>
    )
}