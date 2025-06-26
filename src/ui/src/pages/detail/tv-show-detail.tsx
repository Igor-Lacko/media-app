import DetailLayout from "layouts/detail-layout";
import TvShow from "@shared/interface/models/tv-show";
import useFetchById from "hooks/use-fetch-by-id";
import DetailProps from "utils/props/detail-props";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";

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
        title: tvShow.title,
        hasThumbnail: true,
        hasGenres: true,
        hasDescription: true,
        playable: false,
        canBeMarkedFavorite: true,
        headerType: DetailHeaders.ENTERTAINMENT,
        hasWatchStatus: true,
        editBarProps: {
            addTitle: "Add Season",
            onAdd: () => { /* Implement add season functionality */ },
            editTitle: "Edit TV Show",
            onEdit: () => { /* Implement edit functionality */ },
            deleteTitle: "Delete TV Show",
            onDelete: () => { /* Implement delete functionality */ },
            hasMarkFavorite: true,
            onMarkFavorite: () => { /* Implement mark favorite functionality */ },
            rateTitle: "Rate TV Show",
            onRate: () => { /* Implement rate functionality */ },
            onSetWatchStatus: () => { /* Implement set watch status functionality */ },
        },
        listProps: {
            path: "seasons",
            items: tvShow.seasons,
            showRating: true,
            showThumbnail: true
        }
    };

    return <DetailLayout<TvShow> {...props} />;
}