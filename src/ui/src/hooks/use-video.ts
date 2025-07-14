import React, { useEffect, useRef } from "react";

/**
 * Custom hook to manage video playback and controls.
 * First sets up event listeners on the video element, and returns functions to control playback.
 * 
 * @param ref Reference to the HTML video element.
 * @param initialTime Initial playback time to set when the video loads.
 * @param setPlay Function to set the playback state (play or pause).
 * @param setSpeed Function to set the playback speed.
 * @param setTime Function to set the current playback time.
 * @param setDuration Function to set the total duration of the video.
 * @param playbackStoreFunction Function to store the current playback time into the DB.
 * @param durationStoreFunction Function to store the total duration of the video into the DB.
 * @param startedWatchingFunction Optional function to call when the video starts playing (sets the tv show status to "Currently Watching").
 * @param timestampRef Optional reference to a number that can be used to sync with a notebook.
 * 
 * @returns An object containing functions to control the video.
 */
export default function useVideo(
    ref: React.RefObject<HTMLVideoElement | null>,
    initialTime: number,
    setPlay: (play: boolean) => void,
    setSpeed: (speed: number) => void,
    setTime: (time: number) => void,
    setDuration: (duration: number) => void,
    playbackStoreFunction: (time: number) => Promise<void>,
    durationStoreFunction: (duration: number) => Promise<void>,
    startedWatchingFunction?: () => Promise<boolean>,
    timestampRef?: React.RefObject<number>
) : {
    onSwitchPlaying: () => void;
    onGoForward: () => void;
    onGoBack: () => void;
    onIncreaseSpeed: () => void;
    onDecreaseSpeed: () => void;
} {
    // To reset if the ref loads
    useEffect(() => {
        if (ref.current) {
            // Function on play
            ref.current.onplay = () => setPlay(true);

            // On pause, store the current time
            ref.current.onpause = async () => {
                if (ref.current) {
                    setPlay(false);
                    await playbackStoreFunction(ref.current!.currentTime);
                }
            }

            // Rate change function
            ref.current.onratechange = () => setSpeed(ref.current!.playbackRate);

            // Time update, update the timestamp if provided
            if (timestampRef && ref.current) {
                ref.current.ontimeupdate = () => {
                    if (ref.current) {
                        setTime(ref.current!.currentTime);
                        timestampRef.current = ref.current!.currentTime;
                    }
                }
            }

            else if (ref.current) {
                ref.current.ontimeupdate = () => setTime(ref.current!.currentTime);
            }

            // On video load, get duration and set the initial time
            ref.current.onloadedmetadata = async () => {
                ref.current!.currentTime = initialTime;
                setDuration(ref.current!.duration);
                setTime(ref.current!.currentTime);
                ref.current!.play();
                if (startedWatchingFunction) {
                    await Promise.all([
                        durationStoreFunction(ref.current!.duration),
                        startedWatchingFunction()
                    ]);
                }

                else {
                    await durationStoreFunction(ref.current!.duration);
                }
            }
        }
    }, [ref]);

    /**
     * Handler functions
     */

    // Play/Pause
    const onSwitchPlaying = async () => {
        if (ref.current) {
            if (!ref.current.paused) {
                ref.current.pause();
            } else {
                ref.current.play();
            }
        }
    }

    // Forward 10 seconds
    const onGoForward = () => {
        if (ref.current) {
            ref.current.currentTime = Math.min(ref.current.currentTime + 10, ref.current.duration);
        }
    }

    // Backward 10 seconds
    const onGoBack = () => {
        if (ref.current) {
            ref.current.currentTime = Math.max(ref.current.currentTime - 10, 0);
        }
    }

    // Increase playback speed by 0.25, max 4x
    const onIncreaseSpeed = () => {
        if (ref.current) {
            ref.current.playbackRate = Math.min(ref.current.playbackRate + 0.25, 4);
        }
    }

    // Decrease playback speed by 0.25
    const onDecreaseSpeed = () => {
        if (ref.current) {
            ref.current.playbackRate = Math.max(ref.current.playbackRate - 0.25, 0.25);
        }
    }


    return {
        onSwitchPlaying,
        onGoForward,
        onGoBack,
        onIncreaseSpeed,
        onDecreaseSpeed,
    };
}