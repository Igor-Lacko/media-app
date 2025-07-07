import Lecture from "@shared/interface/models/lecture";
import FormSection from "components/sections/form-section";
import FileBrowseOption from "components/options/file-browse-option";
import InputOption from "components/options/input-option";
import SubmitLecture from "data/submit-handlers/lecture-submit";
import useFetchById from "hooks/use-fetch-by-id";
import FormLayout from "layouts/form-layout";
import { useRef } from "react";
import { useLocation } from "react-router-dom"
import { defaultLecture } from "utils/model-defaults";
import LoadingPage from "pages/other/loading-page";

/**
 * Form page for adding a new lecture.
 * Can also be used to edit an existing lecture, this is done by passing a route param.
 * @param route Optional route parameter containing the lecture data to pre-fill the form.
 */
export default function AddLecturePage({ route }: { route?: any }) {
    // Initial data or the subject that the lecture is for
    const location = useLocation();
    const subjectId = location.state.id || -1;
    const {model: lecture, isLoading} = useFetchById<Lecture>("/api/lectures", "lectureId");
    const creating = !lecture;

    // Constructed lecture
    const lectureRef = useRef<Lecture>(lecture || defaultLecture(-1, subjectId));

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <FormLayout
            title={!creating ? "Edit Lecture" : "Add Lecture"}
            ref={lectureRef}
            submitFunction={
                !creating ? async (lecture: Lecture) => await SubmitLecture(lecture, true)
                    : async (lecture: Lecture) => await SubmitLecture(lecture, false, subjectId)
            }
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={!creating ? "Lecture updated successfully." : "Lecture added successfully."}
        >
            <FormSection
                title={"Lecture Information"}
            >
                <InputOption
                    title={"Lecture Title*"}
                    initial={lectureRef.current.title}
                    onChange={(value) => lectureRef.current.title = value}
                />
                <FileBrowseOption
                    title={"Lecture video"}
                    allowed={"video"}
                    initial={lectureRef.current.videoUrl || ""}
                    onChange={(value) => lectureRef.current.videoUrl = value}
                />
            </FormSection>
        </FormLayout>
    )
}