import VideoUpperBarProps from "utils/props/video-upper-bar-props";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStickyNote } from "react-icons/fa";
import classNames from "classnames";

/**
 * Upper bar for the video player with a back button and a note button (for lectures).
 * @param props Visibility state, note click handler, and extra class names.
 */
export default function VideoUpperBar(props : VideoUpperBarProps) {
    const navigate = useNavigate();

    return (
        <div
            className={classNames(
                "absolute top-0 left-0 flex items-center justify-between w-full py-5 px-5 \
                transition-all bg-black z-30 duration-300 ease-in-out " + (props.extraClassNames || ""),
                {
                    "opacity-70": props.isVisible,
                    "opacity-0": !props.isVisible,
                }
            )}
        >
            {/** Back button */}
            <div
                className={"flex items-center justify-start w-1/10 h-full"}
            >
                <FaArrowLeft
                    className={"text-gray-500 hover:text-gray-600 text-2xl cursor-pointer"}
                    onClick={async () => {
                        if(props.ref.current) {
                            await props.saveContinueAt(props.ref.current.currentTime);
                        }
                        navigate(-1);
                    }}
                />
            </div>
            {/** Note button */}
            {props.onNoteClick && <FaStickyNote
                className={"text-gray-500 text-2xl cursor-pointer hover:text-gray-600"}
                onClick={props.onNoteClick}
            />}
        </div>
    )
}