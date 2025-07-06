import classNames from "classnames";
import { use, useEffect, useState } from "react";
import { FaPause, FaPlay, FaForward, FaBackward, FaFastForward, FaFastBackward, FaStepForward, FaStepBackward } from "react-icons/fa";
import VideoLowerBarProps from "utils/props/video/video-lower-bar-props";
import PlaybackSlider from "./playback-slider";
import { LengthToTimeVideo } from "utils/adapters/length-to-time";
import useVideo from "hooks/use-video";

/**
 * Lower bar for the video player with play, pause, forward, and backward controls.
 * @param props Include button handlers, isVisible ref and extra class names.
 */
export default function VideoLowerBar(props : VideoLowerBarProps) {
    // State
    const [speed, setSpeed] = useState(props.ref.current?.playbackRate || 1.0);
    const [playing, setPlaying] = useState(!props.ref.current?.paused || false);
    const [time, setTime] = useState(props.ref.current?.currentTime || 0);
    const [duration, setDuration] = useState(props.ref.current?.duration || 0);

    // Controls
    const { onSwitchPlaying, onGoForward, onGoBack, onIncreaseSpeed, onDecreaseSpeed } = useVideo(
        props.ref,
        props.initialTime,
        setPlaying,
        setSpeed,
        setTime,
        setDuration,
        props.saveContinueAt,
        props.saveLength,
        props.timestampRef
    );

    return (
        <div
            className={classNames(
                "absolute flex-col flex bottom-0 left-0 items-center justify-start w-full h-16 \
                transition-all bg-black z-30 overflow-visible duration-500 ease-in-out backdrop-blur-md " + (props.extraClassNames || ""),
                {
                    "opacity-70": props.isVisible,
                    "opacity-0": !props.isVisible,
                }
            )}
        >
            <PlaybackSlider
                value={time}
                setValue={(value) => {
                    setTime(value);
                    if(props.ref.current) {
                        props.ref.current.currentTime = value;
                    }
                }}
                duration={duration}
            />
            <div
                className={"flex w-full items-center justify-start px-5 py-5 h-15"}
            >
                {/** Play, Pause */}
                <div
                    className={"flex items-center justify-start text-gray-500 w-1/10 h-full"}
                >
                    {playing ?
                        <FaPause
                            className={"text-gray-500 ml-5 text-2xl cursor-pointer hover:text-gray-600"}
                            onClick={onSwitchPlaying} 
                        /> : 
                        <FaPlay
                            className={"text-gray-500 ml-5 text-2xl cursor-pointer hover:text-gray-600"}
                            onClick={onSwitchPlaying}
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
                        onClick={onGoBack}
                    />
                    <FaForward
                        className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600"}
                        onClick={onGoForward}
                    />
                </div>
                {/** Increase/decrease playback speed */}
                <div
                    className={"flex items-center justify-start w-2/10 h-full space-x-5 text-gray-500 text-lg"}
                >
                    Playback speed: {speed.toFixed(2) || "1.00"}x
                    <FaFastBackward
                        className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600 ml-5"}
                        onClick={onDecreaseSpeed}
                    />
                    <FaFastForward 
                        className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600"}
                        onClick={onIncreaseSpeed}
                    />
                </div>
                {/** Time */}
                <div
                    className={"flex items-center justify-center w-2/10 h-full text-gray-500 text-lg"}
                >
                    {LengthToTimeVideo(time)} / {LengthToTimeVideo(duration)}
                </div>
            </div>
        </div>
    )
}