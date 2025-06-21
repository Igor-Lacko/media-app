import Genre from "@shared/enum/genre";
/**
 * Common interface for movies/shows/subjects that can be displayed in a card.
 */
export interface CardDisplayable {
    identifier?: number;
    title: string;
    rating?: number;
    thumbnailUrl?: string;
    genres: Genre[];
    shortDescription?: string;
    nofSubMedia?: number;
}

export default CardDisplayable;