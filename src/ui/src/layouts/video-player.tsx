import VideoLowerBar from "components/controls/video-lower-bar";
import VideoUpperBar from "components/controls/video-upper-bar";
import InfoModal from "components/modals/info-modal";
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

    // Error modal if the next episode does not exist
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    // To control the video
    const {videoRef, ...videoControls} = useVideo(props.saveContinueAt, props.initialPlaybackTime);


    // Lower bar props
    const lowerBarProps : VideoLowerBarProps = {
        // Visual
        isVisible: areBarsVisible,
        title: props.title,

        // Seeking
        ref: videoRef,

        // Handlers
        onSwitchPlaying: async () => {
            videoControls.onSwitchPlaying();
        },
        onGoForward: videoControls.onGoForward,
        onGoBack: videoControls.onGoBack,
        onIncreaseSpeed: videoControls.onIncreaseSpeed,
        onDecreaseSpeed: videoControls.onDecreaseSpeed,
        onTimeChange: videoControls.onTimeChange,
        saveLength: async (length: number) => {
            await props.saveLength(length);
        }
    }

    // Upper bar props
    const upperBarProps : VideoUpperBarProps = {
        isVisible: areBarsVisible,
        onNoteClick: props.onNoteClick ? () => props.onNoteClick!(videoRef.current?.currentTime || 0) 
                    : undefined,
    }

    return (
        <div
            className={"flex relative w-screen h-screen flex-col overflow-hidden items-center justify-start"}
            onMouseMove={() => {
                // Set to visible and set a timer to hide after 3 seconds
                if (!areBarsVisible) {
                    setAreBarsVisible(true);
                }
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
            {/** Error modal */}
            {errorModalVisible && <InfoModal
                title={"Error"}
                message={"The video you are trying to access does not have a file associated with it. You can add it in it's detail page."}
                onClose={() => setErrorModalVisible(false)}
            />}
        </div>
    );
}