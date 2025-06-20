import axios from 'axios';
import FetchOptions from 'utils/interface/fetch-options';

/**
 * Fetches data from the given URL with the provided parameters.
 * @param url API route to fetch data from.
 * @param params Additional params (Sort, filter, search, etc.) to be sent with the request.
 * @returns Promis with the data object.
 */
export default async function FetchData<T>(url: string, params : FetchOptions): Promise<T[] | null> {
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