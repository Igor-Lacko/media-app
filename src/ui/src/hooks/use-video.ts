import React, { useEffect, useRef } from "react";

/**
 * Custom hook to manage video playback and controls.
 * Provides a reference to the video element and functions to control playback.
 * 
 * @returns An object containing the video reference, playback control functions, and playback state.
 */
export default function useVideo(playbackStoreFunction: (time: number) => Promise<void>, initialPlayback?: number) : {
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
    const onSwitchPlaying = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                await playbackStoreFunction(videoRef.current.currentTime);
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

    // Set initial playback position and play
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = initialPlayback || 0;
            videoRef.current.play();
            setPlaying(true);
        }
    }, [videoRef]);

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