import { Genre, WatchStatus } from "generated/prisma/enums";
import { InsertMovie } from "controllers/movie-controller";
import { InsertTvShow } from "controllers/tv-show-controller";
import { InsertSubject } from "controllers/subject-controller";
import TvShow from "@shared/interface/models/tv-show";
import Movie from "@shared/interface/models/movie";
import Subject from "@shared/interface/models/subject";

/**
 * Seeds mock data into the database.
 */
export default async function seedData() {
    const mockMovies: Movie[] = [
        {
            title: "Inception",
            rating: 8.8,
            genres: [Genre.DRAMA, Genre.HORROR, Genre.ALL],
            shortDescription: "A thief who steals corporate secrets through dream-sharing technology.",
            description: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/inception.png",
            length: 148 * 60, // Converted to seconds
            watchStatus: WatchStatus.WATCHED,
            continueAt: 0,
            isFavorite: true,
        },
        {
            title: "The Matrix",
            rating: 8.7,
            genres: [Genre.ALL, Genre.ACTION],
            shortDescription: "A computer hacker learns about the true nature of his reality.",
            description: "Neo believes that Morpheus, an elusive figure considered to be the most dangerous man alive...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/matrix.jpg",
            length: 136 * 60, // Converted to seconds
            watchStatus: WatchStatus.WATCHING,
            continueAt: 0,
            isFavorite: false,
        },
        {
            title: "Interstellar",
            rating: 8.6,
            genres: [Genre.COMEDY, Genre.DRAMA, Genre.ALL],
            shortDescription: "A team of explorers travel through a wormhole in space.",
            description: "With humanity's survival at stake, a group of astronauts venture into the unknown...",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/interstellar.jpg",
            length: 169 * 60, // Converted to seconds
            watchStatus: WatchStatus.UNWATCHED,
            continueAt: 0,
            isFavorite: false,
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
    ];

    const mockSubjects: Subject[] = [
        {
            title: "Introduction to Programming",
            lectures: [
                {
                    title: "Variables and Data Types",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/variables.mp4",
                    length: 45,
                    continueAt: 0,
                    notes: [],
                    lectureNumber: 1,
                    watchStatus: WatchStatus.UNWATCHED,
                },
                {
                    title: "Control Structures",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/control-structures.mp4",
                    length: 50,
                    continueAt: 0,
                    notes: [],
                    lectureNumber: 2,
                    watchStatus: WatchStatus.UNWATCHED,
                },
            ],
        },
        {
            title: "Data Structures and Algorithms",
            lectures: [
                {
                    title: "Arrays and Linked Lists",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/arrays.mp4",
                    length: 60,
                    continueAt: 0,
                    notes: [],
                    lectureNumber: 1,
                    watchStatus: WatchStatus.UNWATCHED,
                },
                {
                    title: "Sorting Algorithms",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/sorting.mp4",
                    length: 55,
                    continueAt: 0,
                    notes: [],
                    lectureNumber: 2,
                    watchStatus: WatchStatus.UNWATCHED,
                },
            ],
        },
        {
            title: "Operating Systems",
            lectures: [
                {
                    title: "Process Management",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/process-management.mp4",
                    length: 70,
                    continueAt: 0,
                    notes: [],
                    lectureNumber: 1,
                    watchStatus: WatchStatus.UNWATCHED,
                },
                {
                    title: "Memory Management",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/memory-management.mp4",
                    length: 40,
                    continueAt: 0,
                    notes: [],
                    lectureNumber: 2,
                    watchStatus: WatchStatus.UNWATCHED,
                },
            ],
        },
    ];

    // Insert mock movies
    await Promise.all(
        mockMovies.map(async (movie) => {
            try {
                const result = await InsertMovie(movie);
                console.log(`Inserted movie: ${result.title}`);
            } catch (error) {
                console.error(`Error inserting movie ${movie.title}:`, error);
            }
        })
    );

    console.log("Mock movies inserted successfully.");

    // Insert mock TV shows
    await Promise.all(
        mockTvShows.map(async (tvShow) => {
            try {
                const result = await InsertTvShow(tvShow);
                console.log(`Inserted TV show: ${result.title}`);
            } catch (error) {
                console.error(`Error inserting TV show ${tvShow.title}:`, error);
            }
        })
    );

    console.log("Mock TV shows inserted successfully.");

    // Insert mock subjects
    await Promise.all(
        mockSubjects.map(async (subject) => {
            try {
                const result = await InsertSubject(subject);
                console.log(`Inserted subject: ${result.title}`);
            } catch (error) {
                console.error(`Error inserting subject ${subject.title}:`, error);
            }
        })
    );

    console.log("Mock subjects inserted successfully.");
}