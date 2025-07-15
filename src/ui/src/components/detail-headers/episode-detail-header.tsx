import Episode from "@shared/interface/models/episode";
import DetailWatchStatus from "components/other/detail-watch-status";
import HeaderRating from "components/other/header-rating";
import DetailProps from "utils/props/detail/detail-props";

export default function EpisodeDetailHeader(props: DetailProps<Episode>) {
    return (
        <div
            className={"flex items-center justify-start w-full h-auto max-h-80 px-10"}
        >
            {/** Title, length, rating */}
            <div
                className={"flex flex-col pb-5 w-3/10 items-start justify-start h-full space-y-2 text-black dark:text-gray-400"}
            >
                <h1 className={"text-4xl font-extrabold text-black dark:text-gray-400 tracking-wide font-[Roboto]"}>
                    {props.title}
                </h1>
                {<span
                    className={"text-lg text-gray-500 dark:text-gray-400 italic"}
                >
                    {props.model.length ? `${props.model.length} ${props.model.length > 1 ? "minutes" : "minute"}`
                        : "Unknown length"}
                </span>}
            </div>
            {/** Short description */}
            <div
                className={"flex flex-col items-center justify-start w-6/10 ml-10 h-full"}
            >
                <p
                    className={"text-md flex h-full w-full text-black wrap-anywhere dark:text-gray-400"}
                >
                    {props.model.shortDescription || "No description seems to be here yet. You can add one in the edit episode form."}
                </p>
            </div>
            {/** Watch status, play button */}
            <div
                className={"flex flex-col items-center justify-center ml-10 w-1/10 h-full space-y-5"}
            >
                {/** Rating, todo placeholder */}
                {props.rating && props.rating !== -1 && <HeaderRating
                    rating={props.rating}
                />}
                <DetailWatchStatus
                    watchStatus={props.watchStatus!}
                />
            </div>
        </div>
    )
}