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
import UpdateData from "data/crud/update";

/**
 * Form page for adding a new subject.
 * Can also be used to edit an existing subject, this is done by passing a `subject` prop.
 * @param subject Optional subject object to pre-fill the form.
 */
export default function AddSubjectPage({ route } : { route?: any }) {
    // Get param subject or use a blank one
    const location = useLocation();
    const subject = location.state || defaultSubject;

    // Constructed subject
    const subjectRef = useRef<Subject>(subject);

    // To re-render on each add
    const [lectures, setLectures] = useState(subjectRef.current.lectures);

    return (
        <FormLayout
            title={subject.title ? "Edit Subject" : "Add Subject"}
            ref={subjectRef}
            submitFunction={subject.title ? async (subject: Subject) => await SubjectSubmitHandler(subject, lectures) :
                async (subject: Subject) => await UpdateData<Subject>("/api/subjects", subject.identifier!, subject)
            }
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={subject.title ? "Subject updated successfully." : "Subject added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Subject name*"}
                    initial={subjectRef.current.title}
                    onChange={(value) => subjectRef.current.title = value}
                />
            </FormSection>
            <FormSection
                title={"Lectures"}
            >
                <AddOption
                    buttonText={"New Lecture"}
                    onChange={() => setLectures([...lectures, defaultLecture()])}
                />
                {lectures.map((lecture, index) => (
                    <FormSection
                        key={index}
                        title={`Lecture ${index + 1}`}
                    >
                        <InputOption
                            title={"Lecture name*"}
                            initial={lecture.title}
                            onChange={(value) => lecture.title = value}
                        />
                        <FileBrowseOption
                            title={"Lecture video"}
                            initial={lecture.videoUrl || ""}
                            onChange={(value) => lecture.videoUrl = value}
                        />
                        <RemoveOption
                            buttonText={"Remove Lecture"}
                            onChange={() => {setLectures(lectures.filter((_, i) => i !== index))}}
                        />
                    </FormSection>
                ))}
            </FormSection>
        </FormLayout>
    )
}