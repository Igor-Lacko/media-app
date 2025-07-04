import React, { useRef } from "react";

/**
 * Custom hook to manage video playback and controls.
 * Provides a reference to the video element and functions to control playback.
 * 
 * @returns An object containing the video reference, playback control functions, and playback state.
 */
export default function useVideo(playbackStoreFunction: (time: number) => Promise<void>, initialPlayback?: number) : {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onSwitchPlaying: () => void;
    onGoForward: () => void;
    onGoBack: () => void;
    onIncreaseSpeed: () => void;
    onDecreaseSpeed: () => void;
    onTimeChange: (time: number) => void;
} {
    // Video ref
    const videoRef = useRef<HTMLVideoElement>(null);

    // Handlers
    const onSwitchPlaying = async () => {
        if (videoRef.current) {
            if (!videoRef.current.paused) {
                videoRef.current.pause();
                await playbackStoreFunction(videoRef.current.currentTime);
            } else {
                videoRef.current.play();
            }
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

    const onTimeChange = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
        }
    }

    return {
        videoRef,
        onSwitchPlaying,
        onGoForward,
        onGoBack,
        onIncreaseSpeed,
        onDecreaseSpeed,
        onTimeChange
    };
}