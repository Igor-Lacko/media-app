import CardDisplayable from "./card-displayable";
import { Genre } from "@api/src/generated/prisma/enums";

export interface Movie extends CardDisplayable {
	title: string;
    rating?: number;
    thumbnailUrl?: string;
    genres: Genre[];
    shortDescription?: string;
    description?: string;
    videoUrl?: string;
    length?: number;
}