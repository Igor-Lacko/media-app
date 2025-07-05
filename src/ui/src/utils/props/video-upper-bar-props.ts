/**
 * Props for the VideoUpperBar component. TBD
 */
export interface VideoUpperBarProps {
    isVisible: boolean;
    onNoteClick?: () => void;
    // To access current time on exit
    ref: React.RefObject<HTMLVideoElement | null>;
    saveContinueAt: (time: number) => Promise<void>;
    extraClassNames?: string;
}

export default VideoUpperBarProps;