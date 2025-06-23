import { Genre } from "generated/prisma/enums";
import { WatchStatus } from "generated/prisma/enums";
import { InsertMovie } from "controllers/movie-controller";
import { InsertTvShow } from "controllers/tv-show-controller";
import TvShow from "@shared/interface/models/tv-show";
import Movie from "@shared/interface/models/movie";

export default async function seedData() {
    const mockMovies : Movie[] = [
        {
            title: "Inception",
            rating: 8.8,
            genres: [Genre.DRAMA, Genre.HORROR, Genre.ALL],
            shortDescription: "A thief who steals corporate secrets through dream-sharing technology.",
            description: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/inception.png",
            length: 148,
            watchStatus: WatchStatus.WATCHED,
            continueAt: 0,
        },
        {
            title: "The Matrix",
            rating: 8.7,
            genres: [Genre.ALL, Genre.ACTION],
            shortDescription: "A computer hacker learns about the true nature of his reality.",
            description: "Neo believes that Morpheus, an elusive figure considered to be the most dangerous man alive...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/matrix.png",
            length: 136,
            watchStatus: WatchStatus.WATCHING,
            continueAt: 0,
        },
        {
            title: "Interstellar",
            rating: 8.6,
            genres: [Genre.COMEDY, Genre.DRAMA, Genre.ALL],
            shortDescription: "A team of explorers travel through a wormhole in space.",
            description: "With humanity's survival at stake, a group of astronauts venture into the unknown...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/interstellar.jpg",
            length: 169,
            watchStatus: WatchStatus.UNWATCHED,
            continueAt: 0,
        },
        {
            title: "The Dark Knight",
            rating: 9.0,
            genres: [Genre.ACTION, Genre.DRAMA, Genre.ALL],
            shortDescription: "Batman faces the Joker, a criminal mastermind who wants to create chaos in Gotham City.",
            description: "With the help of allies, Batman must stop the Joker's reign of terror...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/dark-knight.jpg",
            length: 152,
            watchStatus: WatchStatus.WATCHED,
            continueAt: 0,
        },
        {
            title: "Avatar",
            rating: 7.8,
            genres: [Genre.ACTION, Genre.SCIFI, Genre.ALL],
            shortDescription: "A paraplegic Marine is sent to Pandora on a unique mission.",
            description: "Jake Sully becomes torn between following orders and protecting the world he feels is his home...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/avatar.jpg",
            length: 162,
            watchStatus: WatchStatus.UNWATCHED,
            continueAt: 0,
        },
    ];

    const mockTvShows: TvShow[] = [
        {
            title: "Breaking Bad",
            genres: [Genre.DRAMA, Genre.CRIME, Genre.ALL],
            shortDescription: "A high school chemistry teacher turns to cooking methamphetamine.",
            description: "Walter White partners with Jesse Pinkman to navigate the criminal underworld...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/breaking-bad.jpg",
            rating: 9.5,
            watchStatus: WatchStatus.UNWATCHED,
            seasons: [
                { seasonNumber: 1, episodes: [] },
                { seasonNumber: 2, episodes: [] },
            ],
        },
        {
            title: "Game of Thrones",
            genres: [Genre.DRAMA, Genre.FANTASY, Genre.ALL],
            shortDescription: "Nine noble families fight for control over the lands of Westeros.",
            description: "As ancient enemies return, the fate of Westeros hangs in the balance...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/game-of-thrones.jpg",
            rating: 9.3,
            watchStatus: WatchStatus.UNWATCHED,
            seasons: [
                { seasonNumber: 1, episodes: [] },
                { seasonNumber: 2, episodes: [] },
            ],
        },
        {
            title: "Stranger Things",
            genres: [Genre.SCIFI, Genre.DRAMA, Genre.ALL],
            shortDescription: "A group of kids uncover supernatural mysteries in their small town.",
            description: "When Will Byers goes missing, his friends discover a world of monsters and secrets...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/stranger-things.jpg",
            rating: 8.9,
            watchStatus: WatchStatus.WATCHED,
            seasons: [
                { seasonNumber: 1, episodes: [] },
                { seasonNumber: 2, episodes: [] },
            ],
        },
        {
            title: "The Office",
            genres: [Genre.COMEDY, Genre.ALL],
            shortDescription: "A mockumentary on a group of office workers.",
            description: "The employees of Dunder Mifflin navigate their daily lives with humor and chaos...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/the-office.jpg",
            rating: 8.8,
            watchStatus: WatchStatus.UNWATCHED,
            seasons: [
                { seasonNumber: 1, episodes: [] },
                { seasonNumber: 2, episodes: [] },
            ],
        },
        {
            title: "Friends",
            genres: [Genre.COMEDY, Genre.ROMANCE, Genre.ALL],
            shortDescription: "Six friends navigate life and love in New York City.",
            description: "Rachel, Ross, Monica, Chandler, Joey, and Phoebe share laughs and drama...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/friends.jpg",
            rating: 8.9,
            watchStatus: WatchStatus.WATCHED,
            seasons: [
                { seasonNumber: 1, episodes: [] },
                { seasonNumber: 2, episodes: [] },
            ],
        },
    ];

    // Insert mock movies
    for (const movie of mockMovies) {
        await InsertMovie(movie)
            .then((result) => {
                if (result) {
                    console.log(`Inserted movie: ${result.title}`);
                } else {
                    console.error(`Failed to insert movie: ${movie.title}`);
                }
            })
            .catch((error) => {
                console.error(`Error inserting movie ${movie.title}:`, error);
            });
    }

    console.log("Mock movies inserted successfully.");

    // Insert mock TV shows
    for (const tvShow of mockTvShows) {
        await InsertTvShow(tvShow)
            .then((result) => {
                if (result) {
                    console.log(`Inserted TV show: ${result.title}`);
                } else {
                    console.error(`Failed to insert TV show: ${tvShow.title}`);
                }
            })
            .catch((error) => {
                console.error(`Error inserting TV show ${tvShow.title}:`, error);
            });
    }

    console.log("Mock TV shows inserted successfully.");
}