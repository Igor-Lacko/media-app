import { useState } from "react";
import Genre from "@shared/enum/genre";
import SortKey from "@shared/enum/sort-key";

/**
 * Custom hook for managing filter, sort and search state.
 */
export default function useFilter() {
    const [filter, setFilter] = useState(Genre.ALL);
    const [sort, setSort] = useState(SortKey.NAME);
    const [search, setSearch] = useState("");
    const [ascending, setAscending] = useState(true);
    return { filter, setFilter, sort, setSort, search, setSearch, ascending, setAscending };
}