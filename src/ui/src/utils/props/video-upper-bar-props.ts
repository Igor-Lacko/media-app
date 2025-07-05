/**
 * Props for the VideoUpperBar component. TBD
 */
export interface VideoUpperBarProps {
    // Visual stuff
    isVisible: boolean;
    title: string;

    // If this is defined, a notebook appears on click
    onNoteClick?: () => void;

    // To access current time on exit and store it in the DB
    ref: React.RefObject<HTMLVideoElement | null>;
    saveContinueAt: (time: number) => Promise<void>;

    // Styling, unused (so far)
    extraClassNames?: string;
}

export default VideoUpperBarProps;