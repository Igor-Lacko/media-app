import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchDataWithId } from "data/crud/read";

/**
 * Hook to fetch a single data object by its unique identifier from the given URL.
 * @param url URL of the API route to fetch data from.
 */
export default function useFetchById<T>(url: string, param: string = "id"): T | undefined {
    // Get param id depending on the provided parameter
    const params = useParams<{ id: string; seasonId?: string; }>();
    const id = param === "id" ? params.id
        : param === "seasonId" ? params.seasonId
            : (() => { throw new Error(`Invalid parameter: ${param}. Expected 'id' or 'seasonId'.`) })();

    // Fetch
    const data = id ? useQuery({
        queryKey: [url, id],
        queryFn: async () => await FetchDataWithId<T>(url, id),
    }) : undefined;

    return data?.data || undefined;
}