import SortKey from "@shared/enum/sort-key";

/**
 * Adapts a sort key to a readable key-value pair.
 */
export default function SortKeyAdapter(sortKey: SortKey): { key: string; value: SortKey } {
    switch (sortKey) {
        case SortKey.NAME:
            return { key: "Name", value: SortKey.NAME };
        case SortKey.LENGTH:
            return { key: "Length", value: SortKey.LENGTH };
        case SortKey.RATING:
            return { key: "Rating", value: SortKey.RATING };
        case SortKey.NOF_EPISODES:
            return { key: "Number of Episodes", value: SortKey.NOF_EPISODES };
        case SortKey.NOF_SEASONS:
            return { key: "Number of Seasons", value: SortKey.NOF_SEASONS };
        case SortKey.NOF_LECTURES:
            return { key: "Number of Lectures", value: SortKey.NOF_LECTURES };
    }
}