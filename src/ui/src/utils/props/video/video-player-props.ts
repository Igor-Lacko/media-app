/**
 * Props for the video player page layout.
 */
export interface VideoPlayerProps {
	// Video title and file URL
	title: string;
	url: string;

	// Video ref (created in the parent because otherwise it wouldn't be possible for the notebook to access it)
	ref: React.RefObject<HTMLVideoElement | null>;

	// DB updates
	initialPlaybackTime?: number;
	saveContinueAt(time: number): Promise<void>;
	saveLength(length: number): Promise<void>;

	// To sync with the notebook
	timestampRef?: React.RefObject<number>;

	// Go back URL
	backUrl: string;

	// If this is defined, a notebook button appears (for lectures)
	onNoteClick?(currentTime: number): void;

	// To hide the notebook on video click, if the notebook is present
	onVideoClick?(): void;

	// Function for tv shows, sets their watch status to "Currently Watching"
	onInit?(): Promise<boolean>;

	// To set data to finished
	onFinish?(): Promise<boolean>;
}

export default VideoPlayerProps;
