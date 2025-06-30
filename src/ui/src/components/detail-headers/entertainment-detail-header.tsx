import Genre from "@shared/enum/genre";
import DetailFillable from "@shared/interface/detail-fillable";
import RoundedButton from "components/buttons/rounded-button";
import DetailWatchStatus from "components/detail-watch-status";
import HeaderRating from "components/header-rating";
import DetailImage from "components/image/detail-image";
import { FaPlay } from "react-icons/fa";
import GenreAdapter from "utils/adapters/genre-adapter";
import DetailProps from "utils/props/detail-props";

/**
 * Header for a entertainment model's (movie, show, season) detail page.
 * @param props Detail properties including model, submedia, title, and display options.
 */
export default function EntertainmentDetailHeader<T extends DetailFillable>(props: DetailProps<T>) {
    return (
        <div
            className={"flex items-center justify-start w-full h-1/3 px-5"}
        >
            {/*  thumbnail */}
            {props.hasThumbnail && <div
                className={"flex flex-col items-center justify-center w-3/10 py-5 h-full"}
            >
                {props.model.thumbnailUrl && <DetailImage
                    src={props.model.thumbnailUrl}
                    classNames={"h-full"}
                />} {!props.model.thumbnailUrl && <div
                    className={"h-full w-full"}
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
                    {/** Either length or nof seasons/episodes */}
                    {props.playable && props.model.length && <span
                        className={"text-gray-500 dark:text-gray-400 text-md font-medium italic"}
                    >
                        {props.model.length} {props.model.length > 1 ? "minutes" : "minute"}
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
                {props.playable && <RoundedButton
                    text={"Play"}
                    onClick={() => console.log("Play button clicked")}
                    extraClassNames={"bg-purple-500 dark:bg-purple-700 hover:bg-purple-600"}
                    icon={<FaPlay/>}
                />}
            </div>
        </div>
    );
}