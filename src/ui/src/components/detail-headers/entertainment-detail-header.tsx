import Genre from "@shared/enum/genre";
import DetailFillable from "@shared/interface/detail-fillable";
import DetailWatchStatus from "components/other/detail-watch-status";
import HeaderRating from "components/other/header-rating";
import DetailImage from "components/image/detail-image";
import GenreAdapter from "utils/adapters/genre-adapter";
import DetailProps from "utils/props/detail/detail-props";
import { LengthToTimeHeader } from "utils/adapters/length-to-time";
import { IsValidFile } from "electron/electron-api";
import { useEffect, useState } from "react";
import ItemNotFound from "components/other/item-not-found";
import ImagePathToURL from "utils/adapters/file-url-to-path";

/**
 * Header for a entertainment model's (movie, show) detail page.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function EntertainmentDetailHeader<T extends DetailFillable>(props: DetailProps<T>) {
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    useEffect(() => {
        const checkThumbnail = async () => {
            if (props.model.thumbnailUrl) {
                if (await IsValidFile(props.model.thumbnailUrl) || !ImagePathToURL(props.model.thumbnailUrl).isLocal) {
                    setThumbnailLoaded(true);
                }
            }
        };
        checkThumbnail();
    }, [props.model]);

    return (
        <div
            className={"flex items-center justify-start w-full h-auto max-h-80 px-5"}
        >
            {/*  thumbnail */}
            {props.hasThumbnail && <div
                className={"flex flex-col items-center justify-center max-w-3/10 pb-5 h-full"}
            >
                {thumbnailLoaded ? (
                    <DetailImage
                        src={props.model.thumbnailUrl!}
                    />)
                    : (
                        <ItemNotFound
                            title={"Thumbnail not found :(("}
                            message={"The thumbnail for this item does not exist or is not a valid file."}
                            extraClassNames={"rounded-lg shadow-md ml-10 border-2 border-black dark:border-gray-700"}
                        />
                    )
                }
            </div>}
            {/*  title, genres, nof seasons/episodes or length */}
            <div
                className={"flex flex-col py-5 w-2/10 items-start justify-start ml-15 h-full text-black dark:text-gray-400"}
            >
                <h1 className={"text-4xl font-extrabold text-black dark:text-gray-400 tracking-wide font-[Roboto]"}>
                    {props.title}
                </h1>
                <div
                    className={"flex flex-col text-lg items-start justify-end py-5 h-full w-full"}
                >
                    {/** Either length or nof seasons/episodes */}
                    {props.playTitle && props.model.length !== undefined && props.model.length !== null && <span
                        className={"text-gray-500 dark:text-gray-400 text-md font-medium italic"}
                    >
                        {LengthToTimeHeader(props.model.length)}
                    </span>}
                    {props.model.submediaString && <span
                        className={"text-gray-500 dark:text-gray-400 text-md font-medium italic"}
                    >
                        {props.model.submediaString}
                    </span>}
                    {props.hasGenres && (
                        <div className="text-lg text-gray-500 dark:text-gray-400 italic">
                            {props.model.genres!
                                .filter((genre) => genre !== Genre.ALL)
                                .map((genre) => GenreAdapter(genre).key).join(", ")}
                        </div>
                    )}
                </div>
            </div>
            {/* description*/}
            <div
                className={"flex flex-col py-5 w-4/10 ml-10 items-start overflow-y-auto justify-start h-full space-y-2 text-gray-400"}
            >
                <p className={"text-md flex h-full w-full text-black wrap-anywhere dark:text-gray-400"}>
                    {props.description || "No description available."}
                </p>

            </div>
            { /* rating, watch status, play button */}
            <div
                className={"flex flex-col items-center mt-3 ml-10 justify-center py-5 w-2/10 h-full\
                        space-y-5"}
            >
                {props.rating !== undefined && props.rating !== null && props.rating !== -1 && <HeaderRating
                    rating={props.rating}
                />}
                {props.watchStatus !== undefined && props.rating !== null && <DetailWatchStatus
                    watchStatus={props.watchStatus}
                />}
            </div>
        </div>
    );
}