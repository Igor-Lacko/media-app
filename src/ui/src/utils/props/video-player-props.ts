/**
 * Props for the video player page layout.
 */
export interface videoPlayerProps {
    title: string;
    url: string;
    initialPlaybackTime?: number;
    saveContinueAt(time: number): Promise<void>;
    saveLength(length: number): Promise<void>;
    addNote?(time: number, content: string): Promise<void>;
    nextEpisodeFunction?(): void;
    previousEpisodeFunction?(): void;
}

export default videoPlayerProps;