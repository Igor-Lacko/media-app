import { useState, useEffect } from "react";
import FetchOptions from "utils/interface/fetch-options";
import axios from "axios";

/**
 * Hook to fetch data from the api.
 * @param url Base api url.
 * @param options Sort/Filter.
 * @returns Data from the api.
 */
export default function useFetch<T>(url: string, options: FetchOptions) : [T | null] {
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<T>(url, {
                    params: {
                        ...options
                    }
                })
                setData(res.data);
            }

            catch (error) {
                return null;
            }
        }

        fetchData();
    }, []);

    return [data];
}