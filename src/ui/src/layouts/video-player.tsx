import VideoLowerBar from "components/controls/video-lower-bar";
import VideoUpperBar from "components/controls/video-upper-bar";
import InfoModal from "components/modals/info-modal";
import { useRef, useState } from "react";
import VideoLowerBarProps from "utils/props/video/video-lower-bar-props";
import videoPlayerProps from "utils/props/video/video-player-props";
import VideoUpperBarProps from "utils/props/video/video-upper-bar-props";

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

    // Video ref
    const videoRef = useRef<HTMLVideoElement>(null);


    // Lower bar props
    const lowerBarProps : VideoLowerBarProps = {
        // Seeking
        ref: videoRef,

        // Visual
        isVisible: areBarsVisible,

        // Initial time
        initialTime: props.initialPlaybackTime || 0,

        // Handlers
        saveLength: props.saveLength,
        saveContinueAt: props.saveContinueAt,

        // To sync with the notebook, if provided
        timestampRef: props.timestampRef
    }

    // Upper bar props
    const upperBarProps : VideoUpperBarProps = {
        // Visual
        title: props.title,
        isVisible: areBarsVisible,

        // Notebook
        onNoteClick: props.onNoteClick ? () => props.onNoteClick!(videoRef.current?.currentTime || 0) 
                    : undefined,

        // Time handler and ref
        saveContinueAt: async (time: number) => {
            await props.saveContinueAt(time);
        },
        ref: videoRef
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
                onClick={() => {
                    if(videoRef.current) {
                        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                    }
                }}
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