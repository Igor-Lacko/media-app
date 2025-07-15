import Lecture from "@shared/interface/models/lecture";
import Movie from "@shared/interface/models/movie";
import Note from "@shared/interface/models/note";
import Course from "@shared/interface/models/course";
import TvShow from "@shared/interface/models/tv-show";
import axios from "axios";

/**
 * Update data entry by ID.
 * @param url URL to send the request to.
 * @param id Entry identifier to update.
 * @param data Partial data to update the entry with.
 * @return Promise resolving to true if the update was successful, false otherwise.
 */
export default async function UpdateData<T>(url: string, id: number, data: Partial<T>): Promise<boolean> {
    try {
        await axios.patch<Partial<T>>(`${url}/${id}`, data);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Marks a movie or TV show as favorite.
 * @param url URL to send the request to.
 * @param model Movie or TV show model to update.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function MarkAsFavorite<T extends Movie | TvShow>(url: string, model: T): Promise<boolean> {
    try {
        await UpdateData<T>(url, model.identifier!, { isFavorite: !model.isFavorite } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the rating of a movie or TV show.
 * @param url URL to send the request to.
 * @param model Movie or TV show model to update.
 * @param rating New rating value.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function UpdateRating<T extends { rating?: number, identifier?: number }>
(url: string, model: T, rating: number): Promise<boolean> {
    try {
        await UpdateData<T>(url, model.identifier!, { rating } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Sets the watch status of a movie or TV show.
 * @param url URL to send the request to.
 * @param model Movie or TV show model to update.
 * @param watchStatus New watch status value.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function UpdateWatchStatus<T extends { watchStatus: string, identifier?: number }>
(url: string, model: T, watchStatus: string): Promise<boolean> {
    try {
        await UpdateData<T>(url, model.identifier!, { watchStatus } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the description of a movie/tv show/season
 * @param url URL to send the request to.
 * @param model Movie/tv show/Course model to update.
 * @param description New description value.
 * @return Promise resolving to void if the operation was successful, throws an error otherwise.
 */
export async function UpdateDescription<T extends { description?: string, identifier?: number }>
(url: string, model: T, description: string): Promise<boolean> {
    try {
        await UpdateData<T>(url, model.identifier!, { description } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the video URL of a movie/episode/lecture.
 * @param url URL to send the request to.
 * @param model Movie/episode/lecture model to update.
 * @param videoUrl New video URL value.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function UpdateVideoUrl<T extends { videoUrl?: string, continueAt?: number, identifier?: number }>
(url: string, model: T, videoUrl: string): Promise<boolean> {
    try {
        // Also reset current playback position
        await UpdateData<T>(url, model.identifier!, { videoUrl, continueAt: 0 } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the playback position of a movie/episode/lecture.
 * @param url URL to send the request to.
 * @param model Movie/episode/lecture model to update.
 * @param continueAt New playback position in seconds.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function UpdatePlaybackPosition<T extends { continueAt?: number, lastWatchedAt?: number, identifier?: number }> 
(url: string, model: T, continueAt: number): Promise<boolean> {
    const lastWatchedAt = Date.now() / 1000;
    try {
        await UpdateData<T>(url, model.identifier!, { continueAt, lastWatchedAt } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates notes for a lecture model.
 * @param url URL to send the request to.
 * @param model Lecture model to update.
 * @param notes Array of notes to set.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function UpdateNotes(url: string, model: Lecture, notes: Note[]): Promise<boolean> {
    try {
        await UpdateData<Lecture>(url, model.identifier!, { notes } as Partial<Lecture>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the length of a movie/episode/lecture.
 * @param url URL to send the request to.
 * @param model Movie/episode/lecture model to update.
 * @param length New length in seconds.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function UpdateLength<T extends { length?: number, identifier?: number }>
(url: string, model: T, length: number): Promise<boolean> {
    try {
        await UpdateData<T>(url, model.identifier!, { length } as Partial<T>);
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Adds/removes a course from a to-watch list.
 * @param model course model to toggle watchlist status for.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function ToggleCourseWatchlist(model: Course): Promise<boolean> {
    try {
        await UpdateData<Course>("/api/courses", model.identifier!, { toWatch: !model.toWatch });
        return true;
    }

    catch (error) {
        return false;
    }
}

/**
 * Toggles dark mode setting.
 * @param darkMode New dark mode value.
 * @return Promise resolving to true if the operation was successful, false otherwise.
 */
export async function ToggleDarkMode(darkMode: boolean): Promise<boolean> {
    try {
        const response = await axios.patch("/api/settings/dark-mode", { darkMode });
        return response.status === 200;
    }

    catch (error) {
        return false;
    }
}

/**
 * Updates the OMDB API key in the settings.
 * @param omdbKey New OMDB API key.
 * @return Promise resolving to an object indicating success or failure, with an optional error message.
 */
export async function UpdateOMDBKey(omdbKey: string): Promise<{ success: boolean, errorMessage?: string }> {
    try {
        const response = await axios.patch("/api/settings/omdb-key", { omdbKey });
        if (response.status === 200) {
            return { success: true };
        }

        else {
            return { success: false, errorMessage: response.data.error || "Failed to update OMDB key" };
        }
    }

    catch (error) {
        if (axios.isAxiosError(error)) {
            const errorResponse = error.response?.data as { error?: string };
            return { success: false, errorMessage: errorResponse?.error || "Unknown error when updating api key" };
        }
        return { success: false, errorMessage: error instanceof Error ? error.message : "Unknown error" };
    }
}

/**
 * Toggles the display of TV show progress in episodes or seasons.
 * @param tvShowProgressInEpisodes New value for displaying progress in episodes.
 * @return True if the operation was successful, false otherwise.
 */
export async function ToggleTvShowProgressDisplay(tvShowProgressInEpisodes: boolean): Promise<boolean> {
    return axios.patch("/api/settings/show-progress", { tvShowProgressInEpisodes })
        .then(response => response.status === 200)
        .catch(() => false);
}

/**
 * Toggles the markdown preview setting.
 * @param showMarkdownPreview New value for showing markdown preview.
 * @return True if the operation was successful, false otherwise.
 */
export async function ToggleMarkdownPreview(showMarkdownPreview: boolean): Promise<boolean> {
    return axios.patch("/api/settings/markdown-preview", { showMarkdownPreview })
        .then(response => response.status === 200)
        .catch(() => false);
}