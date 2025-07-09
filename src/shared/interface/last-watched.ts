/**
 * Common interface for types that can be displayed in the last watched list.
 */
export default interface LastWatched {
    // Belongs to the show/movie/course
    title: string;

    // E.g. S1E7: episode title
    subTitle?: string;

    // Playback resume point
    continueAt: number;

    // Total duration of the video
    length: number;

    // Thumbnail (included for movies/shows)
    thumbnailUrl?: string;

    // If a div should be displayed instead of a thumbnail if it's not available or nothing
    shouldHaveThumbnail: boolean;

    // For sorting
    lastWatchedAt: number;

    // Link to video
    url: string;

    // File path to video
    filePath: string;
}