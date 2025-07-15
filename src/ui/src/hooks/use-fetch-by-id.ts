import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FetchDataWithId } from "data/crud/read";

/**
 * Hook to fetch a single data object by its unique identifier from the given URL.
 * @param url URL of the API route to fetch data from.
 */
export default function useFetchById<T>(
	url: string,
	param: string = "id",
	deps: any[] = [],
): {
	model?: T | undefined;
	isLoading: boolean;
} {
	// Get param id depending on the provided parameter
	const params = useParams<{
		id?: string;
		seasonId?: string;
		lectureId?: string;
		episodeId?: string;
	}>();
	const id =
		param === "id"
			? params.id
			: param === "seasonId"
			? params.seasonId
			: param === "lectureId"
			? params.lectureId
			: param === "episodeId"
			? params.episodeId
			: (() => {
					throw new Error(`Invalid parameter: ${param}`);
			  })();

	// Fetch
	const data = id
		? useQuery({
				queryKey: [url, id, ...deps],
				queryFn: async () => await FetchDataWithId<T>(url, id),
		  })
		: undefined;

	return {
		model: data?.data || undefined,
		isLoading: data?.isLoading ?? false,
	};
}
