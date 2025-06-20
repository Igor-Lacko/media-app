import { Genre } from "generated/prisma/enums";
import { InsertMovie } from "controllers/movie-controller";

export default async function seedMovies() {
    const mockMovies = [
        {
            title: "Inception",
            rating: 8.8,
            genres: [Genre.DRAMA, Genre.HORROR], // Use enum values
            shortDescription: "A thief who steals corporate secrets through dream-sharing technology.",
            description: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/inception.png",
            length: 148,
        },
        {
            title: "The Matrix",
            rating: 8.7,
            genres: [Genre.ALL, Genre.ACTION], // Use enum values
            shortDescription: "A computer hacker learns about the true nature of his reality.",
            description: "Neo believes that Morpheus, an elusive figure considered to be the most dangerous man alive...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/inception.png",
            length: 136,
        },
        {
            title: "Interstellar",
            rating: 8.6,
            genres: [Genre.COMEDY, Genre.DRAMA, Genre.ALL], // Use enum values
            shortDescription: "A team of explorers travel through a wormhole in space.",
            description: "With humanity's survival at stake, a group of astronauts venture into the unknown...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/interstellar.png",
            length: 169,
        },
    ];

    for (const movie of mockMovies) {
        await InsertMovie(movie)
            .then((result) => {
                if (result) {
                    console.log(`Inserted movie: ${result.title}`);
                } else {
                    console.error(`Failed to insert movie: ${movie.title}`);
                }
            }
            )
            .catch((error) => {
                console.error(`Error inserting movie ${movie.title}:`, error);
            }
        );
    }

    console.log("Mock movies inserted successfully.");
}