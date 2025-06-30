import DetailLayout from "layouts/detail-layout";
import TvShow from "@shared/interface/models/tv-show";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";
import DeleteData from "data/crud/delete";
import { MarkAsFavorite, UpdateDescription, UpdateRating, UpdateWatchStatus } from "data/crud/update";

/**
 * Component for displaying TV show details.
 * @returns Tv Show detail page.
 */
export default function TvShowDetail() {
    const tvShow : TvShow | undefined = useFetchById<TvShow>("/api/shows");
    if(!tvShow) {
        return <NotFoundPage message="TV Show not found" />
    }

    // Props including children
    const props : DetailProps<TvShow> = {
        model: tvShow,
        submedia: tvShow.seasons,
        title: tvShow.title!,
        hasThumbnail: true,
        hasGenres: true,
        hasDescription: true,
        playable: false,
        canBeMarkedFavorite: true,
        headerType: DetailHeaders.ENTERTAINMENT,
        hasWatchStatus: true,
        listProps: {
            path: "seasons",
            items: tvShow.seasons,
            showRating: true,
            showThumbnail: true
        },
        addTitle: "Add Season",
        editTitle: "Edit TV Show",
        deleteTitle: "Delete TV Show",
        deleteFunction: async () => await DeleteData("/api/shows", tvShow.identifier!),
        hasMarkFavorite: true,
        markFavoriteFunction: async () => await MarkAsFavorite<TvShow>("/api/shows", tvShow),
        rateTitle: "Rate TV Show",
        rateFunction: async (rating: number) => await UpdateRating<TvShow>("/api/shows", tvShow, rating),
        watchStatusFunction: async (watchStatus) => await UpdateWatchStatus<TvShow>("/api/shows", tvShow, watchStatus),
        setDescriptionFunction: async (description: string) => await UpdateDescription<TvShow>("/api/shows", tvShow, description)
    };

    return <DetailLayout<TvShow> {...props} />;
}