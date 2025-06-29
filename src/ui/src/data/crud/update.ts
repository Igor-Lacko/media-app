import Movie from "@shared/interface/models/movie";
import TvShow from "@shared/interface/models/tv-show";
import axios from "axios";

/**
 * Update data entry by ID.
 * @param url URL to send the request to.
 * @param id Entry identifier to update.
 * @param data Partial data to update the entry with.
 * @throws Error if the update fails.
 */
export default async function UpdateData<T>(url: string, id : number, data: Partial<T>) : Promise<void> {
    try {
        await axios.patch<Partial<T>>(`${url}/${id}`, data);
    }

    catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
}

/**
 * Marks a movie or TV show as favorite.
 * @param url URL to send the request to.
 * @param model Movie or TV show model to update.
 * @throws Error if the operation fails.
 */
export async function MarkAsFavorite<T extends Movie | TvShow>(url: string, model: T) : Promise<void> {
    try {
        await UpdateData<T>(url, model.identifier!, { isFavorite: !model.isFavorite } as Partial<T>);
    }

    catch (error) {
        console.error("Error marking as favorite:", error);
        throw error;
    }
}

/**
 * Updates the rating of a movie or TV show.
 * @param url URL to send the request to.
 * @param model Movie or TV show model to update.
 * @param rating New rating value.
 * @throws Error if the update fails.
 */
export async function UpdateRating<T extends { rating?: number, identifier?: number }>(url: string, model: T, rating: number) : Promise<void> {
    try {
        await UpdateData<T>(url, model.identifier!, { rating } as Partial<T>);
    }

    catch (error) {
        console.error("Error updating rating:", error);
        throw error;
    }
}

/**
 * Sets the watch status of a movie or TV show.
 * @param url URL to send the request to.
 * @param model Movie or TV show model to update.
 * @param watchStatus New watch status value.
 * @throws Error if the update fails.
 */
export async function UpdateWatchStatus<T extends { watchStatus: string, identifier?: number }>(url: string, model: T, watchStatus: string) : Promise<void> {
    try {
        await UpdateData<T>(url, model.identifier!, { watchStatus } as Partial<T>);
    }

    catch (error) {
        console.error("Error setting watch status:", error);
        throw error;
    }
}

/**
 * Updates the description of a movie/tv show/season
 * @param url URL to send the request to.
 * @param model Movie/tv show/subject model to update.
 * @param description New description value.
 * @throws Error if the update fails.
 */
export async function UpdateDescription<T extends { description?: string, identifier?: number }>(url: string, model: T, description: string) : Promise<void> {
    try {
        await UpdateData<T>(url, model.identifier!, { description } as Partial<T>);
    }

    catch (error) {
        console.error("Error updating description:", error);
        throw error;
    }
}