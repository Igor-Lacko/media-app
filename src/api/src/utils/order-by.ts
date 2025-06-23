import SortKey from "@shared/enum/sort-key";

/**
 * Returns undefined for attributes that the DB does not include (computed) -- sorting is done after the query.
 * @param key The key to sort by.
 * @returns Undefined or the attribute to sort by in descending order.
 */
export default function GetOrderBy (key : SortKey) : { [key: string]: "desc"} | undefined {
    switch (key) {
        case SortKey.NOF_EPISODES: case SortKey.NOF_SEASONS:
            return undefined;

        default:
            return { [key]: "desc" };
    }
}