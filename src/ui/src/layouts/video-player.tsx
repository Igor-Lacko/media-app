import videoPlayerProps from "utils/props/video-player-props";

export default function VideoPlayerLayout(props : videoPlayerProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
            <video
                className="w-full max-w-3xl rounded-lg shadow-lg"
                controls
                src={`file://${props.url}`}
                onError={(e) => console.error('Video error:', e)}
            />
            <button
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={props.onClose}
            >
                Close
            </button>
        </div>
    );
}