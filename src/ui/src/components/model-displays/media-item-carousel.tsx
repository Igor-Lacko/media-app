import CarouselProps from "utils/props/model-elements/carousel-props";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IsValidFile } from "utils/electron-api";
import { useNavigate } from "react-router-dom";
import { LengthToTimeVideo } from "utils/adapters/length-to-time";

export default function MediaItemCarousel(props: CarouselProps) {
    // For navigation to the videos
    const navigate = useNavigate();

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
        className={"flex flex-shrink flex-col items-center justify-start bg-white dark:bg-gray-800\
                            border-2 border-black dark:border-gray-400" + (props.childExtraClassNames || "")}
    >
        {/** Thumbnail and play button over it */}
        <div
            className={"w-full flex items-center justify-center relative border-b-2 border-black dark:border-gray-700"}
        >
            {validThumbnails[index] ? (
                <img
                    src={`file://${model.thumbnailUrl}`}
                    alt={model.title}
                    className={"w-full h-full object-fit"}
                />
            ) : (
                <div
                    className={"w-full h-full bg-gray-200 dark:bg-gray-700"}
                />
            )}
            <FaPlay
                className={"text-gray-300 hover:text-gray-400 dark:text-gray-500 dark:hover:text-gray-400\
                                    transition-colors duration-300 size-32 absolute cursor-pointer"}
                onClick={() => navigate(`${model.filePath}`)}
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
                    onClick={() => navigate(model.url)}
                >
                    {model.title}
                </h2>
                {model.length && <span className={"text-md text-gray-600 dark:text-gray-300"}>
                    {`${model.continueAt ? LengthToTimeVideo(model.continueAt) + " / " : ""}${LengthToTimeVideo(model.length)}`}
                </span>}
            </div>
            {/** Sub-title, if present */}
            {model.subTitle && (
                <span className={"text-md text-gray-500 dark:text-gray-400 italic"}>
                    {model.subTitle}
                </span>
            )}
        </div>
    </div>
    {/** Next button */ }
    {
        index < props.models.length - 1 && (
            <a
                href={`#carousel-item-${index + 1}`}
                className={"btn btn-circle -translate-y-1/2 z-10"}
                onClick={(e) => e.preventDefault()}
            >
                ❯
            </a>
        )
    }
            </div >
}