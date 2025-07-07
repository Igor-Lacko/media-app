import Subject from "@shared/interface/models/subject";
import DeleteData from "data/crud/delete";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import LoadingPage from "pages/other/loading-page";
import NotFoundPage from "pages/other/page-not-found";
import DetailHeaders from "utils/enum/detail-headers";
import DetailProps from "utils/props/detail/detail-props";

export default function SubjectDetail() {
    // Subject for which the detail is displayed
    const {model: subject, isLoading} = useFetchById<Subject>("/api/subjects");

    if (isLoading) {
        return <LoadingPage />;
    }

    else if (!subject) {
        return <NotFoundPage message="Subject not found" />;
    }

    // Props
    const props : DetailProps<Subject> = {
        model: subject,
        submedia: subject.lectures,
        title: subject.title!,
        hasThumbnail: false,
        hasGenres: false,
        headerType: DetailHeaders.SUBJECT,
        listProps: {
            path: "lectures",
            items: subject.lectures,
            showRating: false,
            showThumbnail: false,
            notFoundTitle: "No lectures found",
            notFoundMessage: "This subject has no lectures yet. You can add one by clicking the 'Add Lecture' button above, or edit the subject to add a lecture.",
        },
        addTitle: "Add Lecture",
        editTitle: "Edit Subject",
        deleteTitle: "Delete Subject",
        deleteFunction: async () => await DeleteData("/api/subjects", subject.identifier!),
    }

    return (
            <DetailLayout
                {...props}
            />
        );
}