import { useQuery } from "@tanstack/react-query";
import { FetchDataWithId } from "data/crud/read";
import { useParams } from "react-router-dom";

export default function useFetchWithChildId<T>(url: string, parentIdKey: string, childIdKey: string) : 
{
    parent?: T;
    childId?: string;
} {
    const params = useParams<{ id?: string; seasonId?: string; lectureId?: string; episodeId?: string; }>();

    // We need both the id and the element from the parent
    const parentId = parentIdKey === "id" ? params.id
        : parentIdKey === "seasonId" ? params.seasonId
        : parentIdKey === "lectureId" ? params.lectureId
        : parentIdKey === "episodeId" ? params.episodeId
        : undefined;

    // Parent element
    const parent = useQuery({
        queryKey: [url, parentId],
        queryFn: async () => await FetchDataWithId<T>(url, parentId!),
    })

    // Child id
    const childId = childIdKey === "seasonId" ? params.seasonId
        : childIdKey === "lectureId" ? params.lectureId
        : childIdKey === "episodeId" ? params.episodeId
        : undefined;

    return {
        parent: parent?.data || undefined,
        childId: childId
    };
}