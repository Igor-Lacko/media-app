import React from "react";

/**
 * Props for the VideoLowerBar component.
 */
export interface VideoLowerBarProps {
    // Visual stuff
    isVisible: boolean;
    title: string;

    // Pause/play
    onSwitchPlaying: () => void;

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

    ref: React.RefObject<HTMLVideoElement | null>;

    // Styling
    extraClassNames?: string;
}

export default VideoLowerBarProps;