import Season from "@shared/interface/models/season";
import HeaderRating from "components/other/header-rating";
import DetailProps from "utils/props/detail-props";

/**
 * Header for a season detail page.
 * @param props Includes season model, title, and display options.
 */
export default function SeasonDetailHeader(props: DetailProps<Season>) {
    return (
        <div
            className={"flex items-center justify-start w-full h-1/3 px-10"}
        >
            {/** Title, nofepisodes */}
            <div
                className={"flex flex-col py-5 w-3/10 items-start justify-between h-full text-black dark:text-gray-400"}
            >
                <div>
                    <h1 className={"text-4xl font-extrabold text-black dark:text-gray-400 tracking-wide font-[Roboto]"}>
                        {props.title}
                    </h1>
                    <span
                        className={"text-lg text-gray-500 dark:text-gray-400 italic"}
                    >
                        {props.model.submediaString!}
                    </span>
                </div>
                {/** Rating, todo placeholder */}
                {props.rating !== null && props.rating !== undefined && props.rating !== -1 && <HeaderRating
                    rating={props.rating}
                />}
            </div>
            {/** Description */}
            <div
                className={"flex flex-col items-center justify-start w-7/10 ml-10 h-full"}
            >
                <p
                    className={"text-md flex h-full w-full text-black wrap-anywhere dark:text-gray-400"}
                >
                    {props.description || "No description seems to be here yet. You can add one by clicking on the button below :))."}
                </p>
            </div>
        </div>
    )
}