import axios from 'axios';
import FetchOptions from 'utils/props/other/fetch-options';
import Settings from '@shared/interface/models/settings';

/**
 * Fetches bulk data from the given URL with the provided parameters.
 * @param url API route to fetch data from.
 * @param params Additional params (Sort, filter, search, etc.) to be sent with the request.
 * @returns Promise with the data object.
 */
export async function FetchData<T>(url: string, params : FetchOptions): Promise<T[] | null> {
    console.log(`Fetching data from ${url} with params:`, params);

    return await axios.get<T[]>(url, {
        params: {
            ...params
        }
    })
    .then(response => response.data)
    .catch(_error => {
        return null;
    });
}

/**
 * Fetches a single data object by its unique identifier from the given URL.
 * @param url API route to fetch data from.
 * @param id Unique identifier of the data to fetch.
 * @returns Promise with the data object if found, null otherwise.
 */
export async function FetchDataWithId<T>(url: string, id: string): Promise<T | null> {
    console.log(`Fetching data from ${url} with id:`, id);

    return await axios.get<T>(`${url}/${id}`)
    .then(response => response.data)
    .catch(_error => {
        console.error(`Failed to fetch data from ${url} with id: ${id}`);
        return null;
    });
}

/**
 * Loads the application settings from the server.
 * @returns Promise with the settings object.
 */
export async function LoadSettings() : Promise<Settings> {
    return await axios.get<Settings>("/api/settings")
    .then(response => response.data)
    .catch(_error => {
        console.error("Failed to load settings, returning default settings.");
        return { darkMode: true };
    });
}

