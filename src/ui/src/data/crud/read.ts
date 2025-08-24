import axios from "axios";
import Settings from "@shared/interface/models/settings";
import LastWatched from "@shared/interface/last-watched";
import WatchListItem from "@shared/interface/watchlist-item";
import { DBOptions } from "@shared/export-types";
import { SaveFile } from "electron/electron-api";
import { SuccessOrError } from "@shared/success-types";

/**
 * Fetches bulk data from the given URL with the provided parameters.
 * @param url API route to fetch data from.
 * @returns Promise with the data object.
 */
export async function FetchData<T>(url: string): Promise<T[] | null> {
	return await axios
		.get<T[]>(url)
		.then((response) => response.data)
		.catch((_error) => {
			return null;
		});
}

/**
 * Fetches a single data object by its unique identifier from the given URL.
 * @param url API route to fetch data from.
 * @param id Unique identifier of the data to fetch.
 * @returns Promise with the data object if found, null otherwise.
 */
export async function FetchDataWithId<T>(
	url: string,
	id: string,
): Promise<T | null> {
	return await axios
		.get<T>(`${url}/${id}`)
		.then((response) => response.data)
		.catch((_error) => {
			return null;
		});
}

/**
 * Fetches the last watched items from the server.
 * @param limit Maximum number of items to fetch, -1 for no limit.
 * @returns Promise with the last watched items or null if an error occurs.
 */
export async function FetchLastWatchedItems(
	limit: number = -1,
): Promise<LastWatched[] | null> {
	return await axios
		.get<LastWatched[]>(`/api/last-watched`, { params: { limit: limit } })
		.then((response) => response.data)
		.catch((_error) => {
			return null;
		});
}

/**
 * Fetches items that are planned to be watched, including movies, TV shows, and courses.
 * @returns An object containing arrays of entertainment items and courses, or null if an error occurs.
 */
export async function FetchToWatchItems(): Promise<{
	entertainment: WatchListItem[];
	courses: WatchListItem[];
} | null> {
	return await axios
		.get<{ entertainment: WatchListItem[]; courses: WatchListItem[] }>(
			"/api/watchlist/to-watch",
		)
		.then((response) => response.data)
		.catch((_error) => {
			return null;
		});
}

/**
 * Fetches items that are currently being watched, including movies and TV shows.
 * @returns An array of WatchListItem objects representing currently watched items, or null if an error occurs.
 */
export async function FetchCurrentlyWatchingItems(): Promise<
	WatchListItem[] | null
> {
	return await axios
		.get<WatchListItem[]>("/api/watchlist/watching")
		.then((response) => response.data)
		.catch((_error) => {
			return null;
		});
}

/**
 * Loads the application settings from the server.
 * @returns Promise with the settings object.
 */
export async function LoadSettings(): Promise<Settings> {
	return await axios
		.get<Settings>("/api/settings")
		.then((response) => response.data)
		.catch((_error) => {
			return {
				darkMode: true,
				hasApiKey: false,
				tvShowProgressInEpisodes: false,
				showMarkdownPreview: false,
				showExternalImages: false,
			};
		});
}

/**
 * Calls the API to export the current db and then invokes electron's api to save it as a JSON file.
 * @param options Which data to include.
 * @returns Promise with success status and optional error message.
 */
export async function ExportDb(options: DBOptions): Promise<SuccessOrError> {
	try {
		// Fetch the data first
		const response = await axios
			.post("/api/settings/export", { data: options })
			.then((res) => res.data);

		console.log("Received data for export:", response);

		// And invoke electron
		return await SaveFile(response);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorResponse = error.response?.data as { error?: string };
			return {
				success: false,
				errorMessage:
					(errorResponse && errorResponse.error) || error.message,
			};
		} else {
			return {
				success: false,
				errorMessage:
					error instanceof Error ?
						error.message
					:	"An unexpected error occurred while exporting the database",
			};
		}
	}
}
