import { Genre } from "generated/prisma/enums";
import { WatchStatus } from "generated/prisma/enums";
import { InsertMovie } from "controllers/movie-controller";
import { InsertTvShow } from "controllers/tv-show-controller";
import { InsertSubject } from "controllers/subject-controller";
import TvShow from "@shared/interface/models/tv-show";
import Movie from "@shared/interface/models/movie";
import Subject from "@shared/interface/models/subject";

export default async function seedData() {
    const mockMovies: Movie[] = [
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
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/programming.jpg",
            lectures: [
                {
                    title: "Variables and Data Types",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/variables.mp4",
                    length: 45,
                    continueAt: 0,
                    notes: ["Learn about variables", "Understand primitive data types"],
                },
                {
                    title: "Control Structures",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/control-structures.mp4",
                    length: 50,
                    continueAt: 0,
                    notes: ["Learn about if-else statements", "Understand loops"],
                },
            ],
        },
        {
            title: "Data Structures and Algorithms",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/data-structures.jpg",
            lectures: [
                {
                    title: "Arrays and Linked Lists",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/arrays.mp4",
                    length: 60,
                    continueAt: 0,
                    notes: ["Understand arrays and linked lists", "Learn about their operations"],
                },
                {
                    title: "Sorting Algorithms",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/sorting.mp4",
                    length: 55,
                    continueAt: 0,
                    notes: ["Learn about bubble sort and quicksort", "Understand algorithm complexity"],
                },
            ],
        },
        {
            title: "Operating Systems",
            thumbnailUrl: "/home/igor_lacko/Desktop/media-player/mock/operating-systems.jpg",
            lectures: [
                {
                    title: "Process Management",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/process-management.mp4",
                    length: 70,
                    continueAt: 0,
                    notes: ["Understand processes and threads", "Learn about scheduling algorithms"],
                },
                {
                    title: "Memory Management",
                    videoUrl: "/home/igor_lacko/Desktop/media-player/mock/memory-management.mp4",
                    length: 40,
                    continueAt: 0,
                    notes: ["Learn about paging and segmentation", "Understand virtual memory"],
                },
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

    // Insert mock subjects
    for (const subject of mockSubjects) {
        await InsertSubject(subject)
            .then((result) => {
                if (result) {
                    console.log(`Inserted subject: ${result.title}`);
                } else {
                    console.error(`Failed to insert subject: ${subject.title}`);
                }
            })
            .catch((error) => {
                console.error(`Error inserting subject ${subject.title}:`, error);
            });
    }

    console.log("Mock subjects inserted successfully.");
}