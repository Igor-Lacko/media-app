import prisma from "db/db";
import SortKey from "@shared/enum/sort-key";
import { Genre } from "generated/prisma/enums";

export async function GetMovies(key : SortKey = SortKey.NAME, filter : Genre = Genre.ALL) {
    try {
        const movies = await prisma.movie.findMany(
            {
                orderBy: {
                    [key]: 'desc'
                },

                where: {
                    genres: {
                        hasSome: [filter] // Every movie has ALL for convenience
                    }
                }
            }
        )

        return movies;
    }

    catch (error) {
        alert("Error fetching movies: " + error);
        return [];
    }
}

