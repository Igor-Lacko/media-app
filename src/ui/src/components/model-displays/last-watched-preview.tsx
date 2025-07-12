import CarouselProps from "utils/props/model-elements/last-watched-props";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IsValidFile } from "electron/electron-api";
import { useNavigate } from "react-router-dom";
import { LengthToTimeVideo } from "utils/adapters/length-to-time";

export default function LastWatchedPreview(props: CarouselProps) {
    // For navigation to the videos
    const navigate = useNavigate();

    // To control the current item
    const [currentIndex, setCurrentIndex] = useState(0);

    // To use a placeholder div with a play button instead
    const [validThumbnails, setValidThumbnails] = useState<boolean[]>([]);
    useEffect(() => {
        const checkThumbnails = async () => {
            const thumbnails = await Promise.all(props.models.map(async (model) => {
                if (model.thumbnailUrl) {
                    return await IsValidFile(model.thumbnailUrl);
                }

                return false;
            }));
            setValidThumbnails(thumbnails);
        }
        checkThumbnails();
    }, []);

    return <div
        className={"flex flex-col items-center justify-center bg-white dark:bg-gray-800\
                            border-2 border-black dark:border-gray-700 " + (props.extraClassNames || "")}
    >
        {/** Thumbnail and play button over it */}
        <div
            className={"w-full h-3/4 flex-grow flex items-center justify-center relative border-b-2 border-black dark:border-gray-700"}
        >
            {validThumbnails[currentIndex] ? (
                <img
                    src={`file://${props.models[currentIndex].thumbnailUrl}`}
                    alt={props.models[currentIndex].title}
                    className={"w-full h-full object-fill"}
                />
            ) : (
                <div
                    className={"w-full h-full bg-gray-200 dark:bg-gray-700"}
                />
            )}
            <FaPlay
                className={"text-gray-300 hover:text-gray-400 dark:text-gray-500 dark:hover:text-gray-400\
                                    transition-colors duration-300 size-32 absolute cursor-pointer"}
                onClick={() => navigate(`${props.models[currentIndex].url}`)}
            />
        </div>
        {/** Rest of the data */}
        <div
            className={"flex flex-col items-start justify-start w-full p-2 text-black dark:text-gray-400"}
        >
            {/** Title, length/duration */}
            <div
                className={"flex items-center justify-between w-full p-2"}
            >
                <h2
                    className={"text-xl font-bold cursor-pointer hover:underline"}
                    onClick={() => navigate(props.models[currentIndex].url)}
                >
                    {props.models[currentIndex].title}
                </h2>
                {props.models[currentIndex].length && <span className={"text-md text-gray-600 dark:text-gray-300"}>
                    {`${props.models[currentIndex].continueAt ? LengthToTimeVideo(props.models[currentIndex].continueAt) + " / " : ""}${LengthToTimeVideo(props.models[currentIndex].length)}`}
                </span>}
            </div>
            {/** Sub-title and next buttons */}
            <div
                className={"flex items-center justify-start w-full p-2"}
            >
                {/** Sub-title, if present */}
                {props.models[currentIndex].subTitle && (
                    <span className={"text-md text-gray-500 dark:text-gray-400 italic"}>
                        {props.models[currentIndex].subTitle}
                    </span>
                )}
            </div>
                {/** Next buttons */}
                {props.models.length > 1 && <div
                    className={"flex items-center justify-center space-x-2 w-full"}
                >
                    {props.models.map((_model, index) => (
                        <button
                            key={index}
                            disabled={index === currentIndex}
                            className={"text-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200\
                                        transition-colors duration-300 p-2 rounded-full bg-gray-100 dark:bg-gray-600 cursor-pointer\
                                        disabled:opacity-50 disabled:cursor-auto size-10"}
                            onClick={() => setCurrentIndex(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>}
        </div>
    </div>
}