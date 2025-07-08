import Season from "@shared/interface/models/season";
import TvShow from "@shared/interface/models/tv-show";
import DeleteData from "data/crud/delete";
import { UpdateDescription, UpdateRating } from "data/crud/update";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import { useEffect, useState } from "react";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";

/**
 * Component for displaying season details.
 * @returns Season detail page.
 */
export default function SeasonDetail() {
    const {model: season, isLoading: seasonLoading} = useFetchById<Season>("/api/seasons", "seasonId");

    // Tv show for url
    const {model: tvShow, isLoading: tvShowLoading} = useFetchById<TvShow>("/api/shows");

    // State vars
    const [description, setDescription] = useState(season?.description);
    const [rating, setRating] = useState(season?.rating);


    // Update state on data load
    useEffect(() => {
        if (season) {
            setDescription(season.description);
            setRating(season.rating);
        }
    }, [season]);

    if (seasonLoading || tvShowLoading) {
        return <LoadingPage/>;
    }

    else if (!season || !tvShow) {
        return <NotFoundPage message={"Season not found."} />;
    }

    // Props including children (episodes)
    const props : DetailProps<Season> = {
        model: season,
        submedia: season.episodes,
        title: `Season ${season.seasonNumber}`,
        description: description,
        rating: rating,
        hasThumbnail: false,
        hasGenres: false,
        headerType: DetailHeaders.SEASON,
        backUrl: `/tv-shows/${tvShow.identifier}`,
        listProps: {
            path: "episodes",
            items: season.episodes,
            showRating: true,
            showThumbnail: false,
            notFoundTitle: "No episodes found",
            notFoundMessage: "This season has no episodes yet. You can add one by clicking the 'Add Episode' button above, or edit the season to add an episode.",
        },
        addTitle: "Add Episode",
        editTitle: "Edit Season",
        deleteTitle: "Delete Season",
        deleteFunction: async () => await DeleteData("/api/seasons", season.identifier!),
        rateTitle: "Rate Season",
        rateFunction: async (rating: number) => {
            setRating(rating);
            return await UpdateRating<Season>("/api/seasons", season, rating)
        },
        setDescriptionFunction: async (description: string) => {
            setDescription(description);
            return await UpdateDescription<Season>("/api/seasons", season, description)
        }
    }

    return <DetailLayout<Season> {...props} />;
}