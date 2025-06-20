import { Genre } from "@api/src/generated/prisma/enums";
/**
 * Common interface for movies/shows/lectures that can be displayed in a card.
 */
export interface CardDisplayable {
    title: string;
    rating?: number;
    thumbnailUrl?: string;
    genres: Genre[];
    shortDescription?: string;
}

export default CardDisplayable;