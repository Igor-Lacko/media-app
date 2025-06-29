import Movie from "@shared/interface/models/movie";
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
        console.error("Error updating data:", error);
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
        console.error("Error marking as favorite:", error);
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
        console.error("Error updating rating:", error);
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
        console.error("Error setting watch status:", error);
        return false;
    }
}

/**
 * Updates the description of a movie/tv show/season
 * @param url URL to send the request to.
 * @param model Movie/tv show/subject model to update.
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
        console.error("Error updating description:", error);
        return false;
    }
}