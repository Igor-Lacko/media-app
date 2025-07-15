import React from "react";

/**
 * Props for a playback slider/video position controller
 */
export interface PlaybackSliderProps {
	value: number;
	setValue: (value: number) => void;
	duration: number;
	extraClassNames?: string;
}

export default PlaybackSliderProps;
