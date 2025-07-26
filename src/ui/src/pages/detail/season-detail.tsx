import WatchStatus from "@shared/enum/watch-status";
import Episode from "@shared/interface/models/episode";
import Season from "@shared/interface/models/season";
import TvShow from "@shared/interface/models/tv-show";
import DeleteData from "data/crud/delete";
import { MarkSubmediaAsCompleted, UpdateDescription, UpdateRating } from "data/crud/update";
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
    const { model: season, isLoading: seasonLoading } = useFetchById<Season>("/api/seasons", "seasonId");

    // Tv show for url
    const { model: tvShow, isLoading: tvShowLoading } = useFetchById<TvShow>("/api/shows");

    // State vars
    const [description, setDescription] = useState(season?.description);
    const [rating, setRating] = useState(season?.rating);
    const [episodesCompleted, setEpisodesCompleted] = useState<boolean[]>(
        []
    );


    // Update state on data load
    useEffect(() => {
        if (season) {
            setDescription(season.description);
            setRating(season.rating);
            setEpisodesCompleted(
                season.episodes.map((episode: Episode) => episode.watchStatus === WatchStatus.COMPLETED)
            )
        }   
    }, [season]);

    if (seasonLoading || tvShowLoading) {
        return <LoadingPage />;
    }

    else if (!season || !tvShow) {
        return <NotFoundPage message={"Season not found."} />;
    }

    // Episodes
    const episodes = season.episodes
                    .map((episode, index) => ({
                        ...episode,
                        watchStatus: episodesCompleted[index] ? WatchStatus.COMPLETED :
                            WatchStatus.NOT_WATCHED
                    }));

    // Props including children (episodes)
    const props: DetailProps<Season> = {
        model: season,
        submedia: episodes,
        title: `Season ${season.seasonNumber}`,
        description: description,
        rating: rating,
        hasThumbnail: false,
        hasGenres: false,
        headerType: DetailHeaders.SEASON,
        backUrl: `/tv-shows/${tvShow.identifier}`,
        listProps: {
            path: "episodes",
            items: episodes,
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
        markSubmediaAsCompletedTitle: "Mark Episodes as Completed",
        completeSubmediaFunction: async (id: number, count: number) => {
            const completed = Array(count)
                    .fill(true)
                    .concat(
                        Array(season.episodes.length - count)
                        .fill(false)
                    )
            setEpisodesCompleted(completed);
            return await MarkSubmediaAsCompleted(`/api/seasons/${id}/mark-completed`, count);
        },
        setDescriptionFunction: async (description: string) => {
            setDescription(description);
            return await UpdateDescription<Season>("/api/seasons", season, description)
        }
    }

    return <DetailLayout<Season> {...props} />;
}