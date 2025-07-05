import React from "react";

/**
 * Props for the VideoLowerBar component.
 */
export interface VideoLowerBarProps {
    // Visual stuff
    isVisible: boolean;
    title: string;

    // Initial time and saving
    initialTime: number;
    saveContinueAt: (time: number) => Promise<void>;

    // Forward/backward controls
    onGoForward: () => void;
    onGoBack: () => void;

    // Playback speed
    onIncreaseSpeed: () => void;
    onDecreaseSpeed: () => void;

    // For tv shows and lectures, to switch episodes
    onPreviousEpisode?: () => void;
    onNextEpisode?: () => void;

    // On load
    saveLength: (length: number) => Promise<void>;

    // Video seeking
    onTimeChange?: (time: number) => void;

    // Video ref
    ref: React.RefObject<HTMLVideoElement | null>;

    // Since all the video handlers are added to it in the lower bar, this is here too
    timestampRef?: React.RefObject<number>;

    // Styling
    extraClassNames?: string;
}

export default VideoLowerBarProps;