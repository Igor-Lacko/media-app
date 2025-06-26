import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchDataWithId } from "data/crud/read";

/**
 * Hook to fetch a single data object by its unique identifier from the given URL.
 * @param url URL of the API route to fetch data from.
 */
export default function useFetchById<T>(url: string) : T | undefined{
    // Get id
    const { id } = useParams<{ id: string }>();

    // Fetch
    const data = id ? useQuery({
        queryKey: [url, id],
        queryFn: async () => await FetchDataWithId<T>(url, id),
    }) : undefined;

    return data?.data || undefined;
}