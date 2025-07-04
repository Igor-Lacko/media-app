/**
 * Props for the video player page layout.
 */
export interface videoPlayerProps {
    // Video title and file URL
    title: string;
    url: string;

    // DB updates
    initialPlaybackTime?: number;
    saveContinueAt(time: number): Promise<void>;
    saveLength(length: number): Promise<void>;

    // If this is defined, a notebook button appears (for lectures)
    onNoteClick?(currentTime: number): void;
}

export default videoPlayerProps;