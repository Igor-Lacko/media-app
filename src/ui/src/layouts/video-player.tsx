import VideoLowerBar from "components/controls/video-lower-bar";
import VideoUpperBar from "components/controls/video-upper-bar";
import useVideo from "hooks/use-video";
import { useRef, useState } from "react";
import VideoLowerBarProps from "utils/props/video-lower-bar-props";
import videoPlayerProps from "utils/props/video-player-props";
import VideoUpperBarProps from "utils/props/video-upper-bar-props";

/**
 * Layout for the video player page.
 * @param props Title, URL, button handlers.
 */
export default function VideoPlayerLayout(props : videoPlayerProps) {
    // To control lower/upper bars on mouse movement
    const [areBarsVisible, setAreBarsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // To control the video
    const {videoRef, ...videoControls} = useVideo();

    // placeholders
    const lowerBarProps : VideoLowerBarProps = {
        isVisible: areBarsVisible,
        title: props.title,
        currentSpeed: videoRef.current?.playbackRate,
        ...videoControls,
    }

    const upperBarProps : VideoUpperBarProps = {
        isVisible: areBarsVisible,
        onNoteClick: () => console.log("Note clicked"),
    }
    return (
        <div
            className={"flex flex-col overflow-hidden w-full h-full items-center justify-start"}
            onMouseMove={() => {
                // Set to visible and set a timer to hide after 3 seconds
                setAreBarsVisible(true);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                timeoutRef.current = setTimeout(() => {
                    setAreBarsVisible(false);
                }, 3000);
            }}
        >
            <VideoUpperBar
                {...upperBarProps}
            />
            <video
                src={`file://${props.url}`}
                className={"w-full h-full object-fill"}
                ref={videoRef}
            />
            <VideoLowerBar
                {...lowerBarProps}
            />
        </div>
    );
}