import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import ControlBar from "components/controls/control-bar";
import Course from "@shared/interface/models/course";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/lists/media-item-list";
import ControlBarProps from "utils/props/control-elements/control-bar-props";
import ListProps from "utils/props/lists/list-props";
import { Route, Routes } from "react-router-dom";
import AddCoursePage from "../forms/add-course-page";
import LoadingPage from "pages/other/loading-page";

export default function CoursePage() {
    // Sort/search
    const [sort, setSort] = useState(SortKey.NAME);
    const [search, setSearch] = useState("");

    // Fetch courses
    const {data, isLoading} = useQuery({
        queryKey: ["Courses", sort],
        queryFn: async () => await FetchData<Course>("/api/courses", { sortBy: sort }),
    });

    const controlBarProps: ControlBarProps = {
        title: "Your Courses",
        filter: false,
        sortOptions: [SortKey.NAME, SortKey.NOF_LECTURES],
        onSortChange: (sortKey: SortKey) => { setSort(sortKey); },
        onFilterChange: () => {},
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm); },
        path: "/courses"
    }

    const CourseListProps: ListProps = {
        items: data?.filter((course : Course) => course.title.toLowerCase().includes(search.toLowerCase())) || [],
        showRating: false,
        showThumbnail: false,
        notFoundTitle: "No courses found :((",
        notFoundMessage: "It appears you have no courses yet. You can add one by clicking the "+" button on this page."
    }

    if (isLoading) {
        return <LoadingPage />;
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
                    {...CourseListProps}
                />
            </div>
            <Routes>
                <Route path="/add" element={<AddCoursePage/>} />
            </Routes>
        </div>
    );
}