import React from "react";

/**
 * Props for the VideoLowerBar component.
 */
export interface VideoLowerBarProps {
    // If it's visible
    isVisible: boolean;

    // Video ref
    ref: React.RefObject<HTMLVideoElement | null>;

    // Initial time and saving
    initialTime: number;
    saveContinueAt: (time: number) => Promise<void>;
    onInit?(): Promise<boolean>;

    // Save duration on load
    saveLength: (length: number) => Promise<void>;

    // Timestamp reference for syncing with the notebook
    timestampRef?: React.RefObject<number>;

    // Styling
    extraClassNames?: string;
}

export default VideoLowerBarProps;