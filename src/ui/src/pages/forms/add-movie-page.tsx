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
import useFetchById from "hooks/use-fetch-by-id";

/**
 * Form page for adding a new movie.
 * @param movie Optional movie object to pre-fill the form.
 */
export default function AddMoviePage({ route } : { route?: any }) {
    // Get movie
    const movie : Movie = useFetchById<Movie>("/api/movies");
    const creating = !movie;

    // Constructed object, do not want to render on every change
    const movieRef = useRef<Movie>(movie || defaultMovie);

    console.log("AddMoviePage", movieRef.current);

    // Props for genre selection dropdown
    const genreDropdownProps = useGenreDropdown(movieRef);

    // Props for movie rating
    const ratingSliderProps = useRatingSlider(movieRef);

    return (
        <FormLayout
            title={!creating ? "Edit Movie" : "Add Movie"}
            ref={movieRef}
            submitFunction={!creating ?  async (ref: Movie) => await SubmitMovie(ref, true, movie.identifier!)
                : async (ref: Movie) => await SubmitMovie(ref, false)}
            errorModalMessage={"Please fill in all required fields."}
            successModalMessage={!creating ? "Movie updated successfully." : "Movie added successfully."}
        >
            <FormSection
                title={"Basic Information"}
            >
                <InputOption
                    title={"Title *"}
                    initial={movieRef.current.title!}
                    onChange={(value) => movieRef.current.title = value}
                />
                <TextAreaOption
                    title={"Short Description"}
                    initial={movieRef.current.shortDescription || ""}
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
                    initial={movieRef.current.thumbnailUrl || ""}
                    onChange={(value) => movieRef.current.thumbnailUrl = value}
                />
                <FileBrowseOption
                    title={"Video File"}
                    initial={movieRef.current.videoUrl || ""}
                    onChange={(value) => movieRef.current.videoUrl = value}
                />
            </FormSection>
        </FormLayout>
    );
}