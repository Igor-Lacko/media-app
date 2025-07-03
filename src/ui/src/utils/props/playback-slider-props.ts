/**
 * Props for a playback slider/video position controller
 */
export interface PlaybackSliderProps {
    max: number;
    value: number;
    onChange: (value: number) => void;
}

export default PlaybackSliderProps;