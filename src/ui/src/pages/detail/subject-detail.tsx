import Subject from "@shared/interface/models/subject";
import useFetchById from "hooks/use-fetch-by-id";
import DetailLayout from "layouts/detail-layout";
import NotFoundPage from "pages/not-found";
import DetailHeaders from "utils/enum/detail-headers";
import MockDetailProps from "utils/mocks/mock-detail-props";
import DetailProps from "utils/props/detail-props";

export default function SubjectDetail() {
    // Subject for which the detail is displayed
    const subject : Subject | undefined = useFetchById<Subject>("/api/subjects");

    if (!subject) {
        return <NotFoundPage message="Subject not found" />;
    }

    // Props
    const props : DetailProps<Subject> = {
        model: subject,
        submedia: subject.lectures,
        title: subject.title,
        hasThumbnail: false,
        hasGenres: false,
        hasDescription: false,
        playable: false,
        canBeMarkedFavorite: false,
        headerType: DetailHeaders.SUBJECT,
        hasWatchStatus: false,
        editBarProps: {
            addTitle: "Add Lecture",
            onAdd: () => {
                // Implement add functionality
            },
            editTitle: "Edit Subject",
            onEdit: () => {
                // Implement edit functionality
            },
            deleteTitle: "Delete Subject",
            onDelete: () => {
                // Implement delete functionality
            },
            hasMarkFavorite: false,
        },
        listProps: {
            path: "lectures",
            items: subject.lectures,
            showRating: false,
            showThumbnail: false,
        }
    }

    return (
            <DetailLayout
                {...props}
            />
        );
}