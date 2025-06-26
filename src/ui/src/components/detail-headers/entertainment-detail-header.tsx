import DetailFillable from "@shared/interface/detail-fillable";
import classNames from "classnames";
import PlayButton from "components/buttons/play-button";
import DetailWatchStatus from "components/detail-watch-status";
import HeaderRating from "components/header-rating";
import DetailImage from "components/image/detail-image";
import MediaItemList from "components/media-item-list";
import GenreAdapter from "utils/adapters/genre-adapter";
import DetailProps from "utils/props/detail-props";

/**
 * Header for a entertainment model's (movie, show, season) detail page.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function EntertainmentDetailHeader<T extends DetailFillable>(props: DetailProps<T>) {
    return (
        <div
            className={classNames(
                "flex items-center justify-start w-full h-1/3 bg-gray-100 dark:bg-gray-700\
                    px-5 border-t-2 border-gray-300 dark:border-gray-600",
                )}
        >
            {/*  thumbnail */}
            {props.hasThumbnail && <div
                className={"flex flex-col items-center justify-center w-1/10 py-5 h-full"}
            >
                {props.model.thumbnailUrl && <DetailImage
                    src={props.model.thumbnailUrl}
                    classNames={"h-full"}
                />} {!props.model.thumbnailUrl && <div
                    className={"h-2/3 w-full"}
                />}
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
                    {props.playable && props.model.length && <span
                        className={"text-gray-500 dark:text-gray-400 text-md font-medium italic"}
                    >
                        {props.model.length} {props.model.length > 1 ? "minutes" : "minute"}
                    </span>}
                    {props.hasGenres && (
                        <div className="text-lg text-gray-500 dark:text-gray-400 italic">
                            {props.model.genres!.map((genre) => GenreAdapter(genre).key).join(", ")}
                        </div>
                    )}
                </div>
            </div>
            {/* description*/}
            <div
                className={"flex flex-col py-5 w-5/10 sm:ml-3 lg:ml-1 items-start justify-start h-full space-y-2 text-gray-400"}
            >
                <p className={"text-md overflow-y-auto text-black dark:text-gray-400"}>
                    {props.model.description || "No description available."}
                </p>
                
            </div>
            { /* rating, watch status, play button */}
            <div
                className={"flex flex-col items-center mt-3 ml-10 justify-between py-5 w-2/10 h-full\
                        space-y-5"}
            >
                {props.model.rating && <HeaderRating
                    rating={props.model.rating}
                />}
                {props.hasWatchStatus && <DetailWatchStatus
                    watchStatus={props.model.watchStatus}
                />}
                {/** TODO alt div if video doesn't exist */}
                {props.playable && <PlayButton
                    onClick={() => console.log("Play button clicked")}
                    title={"Play movie"}
                    extraClassNames={"w-2/5 h-2/10"}
                />}
            </div>
        </div>
    );
}