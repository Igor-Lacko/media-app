import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import ControlBar from "components/controls/control-bar";
import Subject from "@shared/interface/models/subject";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/other/media-item-list";
import ControlBarProps from "utils/props/control-bar-props";
import ListProps from "utils/props/list-props";
import { Route, Routes } from "react-router-dom";
import AddSubjectPage from "../forms/add-subject-page";

export default function SubjectPage() {
    // Sort/search
    const [sort, setSort] = useState(SortKey.NAME);
    const [search, setSearch] = useState("");

    // Fetch Subjects
    const data = useQuery({
        queryKey: ["Subjects", sort],
        queryFn: async () => await FetchData<Subject>("/api/Subjects", { sortBy: sort }),
    });

    const controlBarProps: ControlBarProps = {
        title: "Your Subjects",
        filter: false,
        sortOptions: [SortKey.NAME, SortKey.NOF_LECTURES],
        onSortChange: (sortKey: SortKey) => { setSort(sortKey); },
        onFilterChange: () => {},
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm); },
        path: "/subjects"
    }

    const subjectListProps: ListProps = {
        items: data.data?.filter((subject) => subject.title.toLowerCase().includes(search.toLowerCase())) || [],
        showRating: false,
        showThumbnail: false,
        notFoundTitle: "No subjects found :((",
        notFoundMessage: "It appears you have no subjects yet. You can add one by clicking the "+" button on this page."
    }

    return (
        <div
            className={"flex w-full h-full flex-col items-center justify-center p-0 m-0"}
        >
            <ControlBar {...controlBarProps} />
            <div
                className={"flex flex-col w-full h-full p-4"}
            >
                <MediaItemList
                    {...subjectListProps}
                />
            </div>
            <Routes>
                <Route path="/add" element={<AddSubjectPage/>} />
            </Routes>
        </div>
    );
}