import { useRef } from "react";

import Movie from "@shared/interface/models/movie";
import InputOption from "components/options/input-option";
import TextAreaOption from "components/options/text-area-option";
import DropdownCheckboxOption from "components/options/dropdown-checkbox-option";
import SliderOption from "components/options/slider-option";
import FileBrowseOption from "components/options/file-browse-option";
import { defaultMovie } from "utils/model-defaults";
import FormSection from "components/form-section";
import FormLayout from "layouts/form-layout";
import useGenreDropdown from "hooks/use-genre-dropdown";
import useRatingSlider from "hooks/use-rating-slider";
import SubmitMovie from "data/submit-handlers/movie-submit";

/**
 * Form page for adding a new movie.
 */
export default function AddMoviePage() {
    // Constructed object, do not want to render on every change
    const movieRef = useRef<Movie>(defaultMovie);

    // Props for genre selection dropdown
    const genreDropdownProps = useGenreDropdown(movieRef);

    // Props for movie rating
    const ratingSliderProps = useRatingSlider(movieRef);

    return (
        <FormLayout
            title={"Add Movie"}
            ref={movieRef}
            submitFunction={SubmitMovie}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={"Movie added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Title *"}
                    placeholder={"Enter movie title"}
                    onChange={(value) => movieRef.current.title = value}
                />
                <TextAreaOption
                    title={"Short Description"}
                    placeholder={"Enter a short description of the movie"}
                    onChange={(value) => movieRef.current.shortDescription = value}
                />
            </FormSection>
            <FormSection
                title={"Additional Information"}
            >
                <DropdownCheckboxOption
                    props={genreDropdownProps}
                    title={"Genres *"}
                />
                <SliderOption
                    props={ratingSliderProps}
                    title={"Rating"}
                />
            </FormSection>
            <FormSection
                title={"Media Files"}
            >
                <FileBrowseOption
                    title={"Thumbnail"}
                    onChange={(value) => movieRef.current.thumbnailUrl = value}
                />
                <FileBrowseOption
                    title={"Video File"}
                    onChange={(value) => movieRef.current.videoUrl = value}
                />
            </FormSection>
        </FormLayout>
    );
}