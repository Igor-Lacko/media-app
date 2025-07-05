import React from "react";

/**
 * Props for the VideoLowerBar component.
 */
export interface VideoLowerBarProps {
    // Visual stuff
    isVisible: boolean;
    title: string;

    // Video ref
    ref: React.RefObject<HTMLVideoElement | null>;

    // Initial time and saving
    initialTime: number;
    saveContinueAt: (time: number) => Promise<void>;

    // Save duration on load
    saveLength: (length: number) => Promise<void>;

    // Timestamp reference for syncing with the notebook
    timestampRef?: React.RefObject<number>;

    // Styling
    extraClassNames?: string;
}

export default VideoLowerBarProps;