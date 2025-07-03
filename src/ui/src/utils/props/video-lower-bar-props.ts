/**
 * Props for the VideoLowerBar component.
 */
export interface VideoLowerBarProps {
    // Visual stuff
    isVisible: boolean;
    isPlaying: boolean;
    title: string;

    // Pause/play
    onSwitchPlaying: () => void;

    // Forward/backward controls
    onGoForward: () => void;
    onGoBack: () => void;

    // Playback speed
    currentSpeed?: number;
    onIncreaseSpeed: () => void;
    onDecreaseSpeed: () => void;

    // For tv shows and lectures, to switch episodes
    onPreviousEpisode?: () => void;
    onNextEpisode?: () => void;

    // Styling
    extraClassNames?: string;
}

export default VideoLowerBarProps;