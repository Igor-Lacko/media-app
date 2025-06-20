import prisma from "db/db";

export async function GetAllMovies() {
    try {
        const movies = await prisma.movie.findMany(
            {
                // Default alphabetically
                orderBy: {
                    title: "asc"
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