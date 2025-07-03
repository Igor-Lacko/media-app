import React, { useRef } from "react";

/**
 * Custom hook to manage video playback and controls.
 * Provides a reference to the video element and functions to control playback.
 * 
 * @returns An object containing the video reference, playback control functions, and playback state.
 */
export default function useVideo() : {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onSwitchPlaying: () => void;
    isPlaying: boolean;
    onGoForward: () => void;
    onGoBack: () => void;
    onIncreaseSpeed: () => void;
    onDecreaseSpeed: () => void;
} {
    // Video ref
    const videoRef = useRef<HTMLVideoElement>(null);

    // State
    const [isPlaying, setPlaying] = React.useState(false);

    // Handlers
    const onSwitchPlaying = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!isPlaying);
        }
    }

    const onGoForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    }

    const onGoBack = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    }

    const onIncreaseSpeed = () => {
        if (videoRef.current) {
            videoRef.current.playbackRate += 0.25;
        }
    }

    const onDecreaseSpeed = () => {
        if (videoRef.current) {
            videoRef.current.playbackRate -= 0.25;
        }
    }

    return {
        videoRef,
        onSwitchPlaying,
        isPlaying,
        onGoForward,
        onGoBack,
        onIncreaseSpeed,
        onDecreaseSpeed,
    };
}