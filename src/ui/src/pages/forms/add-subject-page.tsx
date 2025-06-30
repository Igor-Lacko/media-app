import { useRef, useState } from "react";

import Subject from "@shared/interface/models/subject";
import Lecture from "@shared/interface/models/lecture";
import { defaultSubject } from "utils/model-defaults";
import { defaultLecture } from "utils/model-defaults";
import FormLayout from "layouts/form-layout";
import SubjectSubmitHandler from "data/submit-handlers/subject-submit";
import FormSection from "components/form-section";
import InputOption from "components/options/input-option";
import AddOption from "components/options/add-option";
import FileBrowseOption from "components/options/file-browse-option";
import RemoveOption from "components/options/remove-option";
import { useLocation } from "react-router-dom";
import RemoveLectureFilter from "utils/filters/remove-lecture-filter";

/**
 * Form page for adding a new subject.
 * Can also be used to edit an existing subject, this is done by passing a `subject` prop.
 * @param subject Optional subject object to pre-fill the form.
 */
export default function AddSubjectPage({ route } : { route?: any }) {
    // Get param subject or use a blank one
    const location = useLocation();
    const subject = location.state.model || defaultSubject;

    // Constructed subject
    const subjectRef = useRef<Subject>(subject);

    // To re-render on each add
    const [lectures, setLectures] = useState(subjectRef.current.lectures);
    const counterRef = useRef(lectures.length + 1);

    return (
        <FormLayout
            title={subject.title ? "Edit Subject" : "Add Subject"}
            ref={subjectRef}
            submitFunction={subject.title ? async (subject: Subject) => await SubjectSubmitHandler(subject, lectures, true, subject.identifier!)
                : async (subject: Subject) => await SubjectSubmitHandler(subject, lectures, false)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={subject.title ? "Subject updated successfully." : "Subject added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Subject name*"}
                    initial={subjectRef.current.title!}
                    onChange={(value) => subjectRef.current.title = value}
                />
            </FormSection>
            <FormSection
                title={"Lectures"}
            >
                <AddOption
                    buttonText={"New Lecture"}
                    onChange={() => {setLectures([...lectures, defaultLecture(counterRef.current++)])}}
                />
                {lectures.map((lecture, index) => (
                    <FormSection
                        key={lecture.lectureNumber}
                        title={`Lecture ${index + 1}`}
                    >
                        <InputOption
                            title={"Lecture name*"}
                            initial={lecture.title!}
                            onChange={(value) => lecture.title = value}
                        />
                        <FileBrowseOption
                            title={"Lecture video"}
                            initial={lecture.videoUrl || ""}
                            onChange={(value) => lecture.videoUrl = value}
                        />
                        <RemoveOption
                            buttonText={"Remove Lecture"}
                            onChange={() => RemoveLectureFilter(
                                lecture,
                                lectures,
                                setLectures,
                            )}
                        />
                    </FormSection>
                ))}
            </FormSection>
        </FormLayout>
    )
}