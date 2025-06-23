import axios from 'axios';
import FetchOptions from 'utils/interface/fetch-options';
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

