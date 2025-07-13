import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import ControlBar from "components/controls/control-bar";
import Course from "@shared/interface/models/course";
import SortKey from "@shared/enum/sort-key";
import { FetchData } from "data/crud/read";
import MediaItemList from "components/lists/media-item-list";
import ControlBarProps from "utils/props/control-elements/control-bar-props";
import ListProps from "utils/props/lists/list-props";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddCoursePage from "../forms/add-course-page";
import LoadingPage from "pages/other/loading-page";
import { SortMedia } from "utils/other/sort-media";

export default function CoursePage() {
    // Sort/search
    const [sort, setSort] = useState(SortKey.NAME);
    const [search, setSearch] = useState("");
    const [ascending, setAscending] = useState(true);

    // To navigate to the add course page
    const navigate = useNavigate();

    // Fetch courses
    const {data, isLoading} = useQuery({
        queryKey: ["Courses", sort],
        queryFn: async () => await FetchData<Course>("/api/courses"),
    });

    const controlBarProps: ControlBarProps = {
        title: "Your Courses",
        filter: false,
        sortOptions: [SortKey.NAME, SortKey.NOF_LECTURES],
        initialSort: sort,
        initialSortOrder: ascending,
        onSortChange: (sortKey: SortKey) => { setSort(sortKey); },
        onFilterChange: () => {},
        onSearchChange: (searchTerm: string) => { setSearch(searchTerm); },
        onSortOrderChange: (asc: boolean) => { setAscending(asc); },
        onAddClick: () => navigate("/courses/add"),
    }

    const CourseListProps: ListProps = {
        // Sorted and searched courses
        items: SortMedia<Course>(data || [], sort, ascending)
        .filter((course: Course) => course.title.toLowerCase().includes(search.toLowerCase())) || [],

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