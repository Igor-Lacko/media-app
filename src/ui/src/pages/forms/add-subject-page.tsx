import { useRef } from "react";

import Subject from "@shared/interface/models/subject";
import { defaultSubject } from "utils/model-defaults";
import FormLayout from "layouts/form-layout";
import SubjectSubmitHandler from "data/submit-handlers/subject-submit";
import FormSection from "components/form-section";
import InputOption from "components/options/input-option";
import AddOption from "components/options/add-option";

/**
 * Form page for adding a new subject.
 */
export default function AddSubjectPage() {
    // Constructed subject
    const subjectRef = useRef<Subject>(defaultSubject);

    return (
        <FormLayout
            title={"Add Subject"}
            ref={subjectRef}
            submitFunction={SubjectSubmitHandler}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={"Subject added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Subject name *"}
                    placeholder={"Enter subject name"}
                    onChange={(value) => subjectRef.current.title = value}
                />
            </FormSection>
            <FormSection
                title={"Lectures"}
            >
                <AddOption
                    title={"Add Lecture"}
                    buttonText={"New Lecture"}
                    onChange={() => console.log("Lecture added")}
                />
            </FormSection>
        </FormLayout>
    )
}