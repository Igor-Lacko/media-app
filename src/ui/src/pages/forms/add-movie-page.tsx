import { useEffect, useRef, useState } from "react";

import Movie from "@shared/interface/models/movie";
import InputOption from "components/options/input-option";
import TextAreaOption from "components/options/text-area-option";
import DropdownCheckboxOption from "components/options/dropdown-checkbox-option";
import SliderOption from "components/options/slider-option";
import FileBrowseOption from "components/options/file-browse-option";
import { defaultMovie } from "utils/other/model-defaults";
import FormSection from "components/sections/form-section";
import FormLayout from "layouts/form-layout";
import useGenreDropdown from "hooks/use-genre-dropdown";
import useRatingSlider from "hooks/use-rating-slider";
import SubmitMovie from "data/submit-handlers/movie-submit";
import useFetchById from "hooks/use-fetch-by-id";
import LoadingPage from "pages/other/loading-page";
import ImagePathToURL from "utils/adapters/image-path-to-url";

/**
 * Form page for adding a new movie.
 * @param movie Optional movie object to pre-fill the form.
 */
export default function AddMoviePage({ route }: { route?: any }) {
	// Get movie
	const { model: movie, isLoading } = useFetchById<Movie>("/api/movies");

	const [initial, setInitial] = useState<Movie>(
		movie || structuredClone(defaultMovie),
	);
	const [creating, setCreating] = useState<boolean>(!movie);

	// Constructed object, do not want to render on every change (copy defaultMovie)
	const movieRef = useRef<Movie>(
		movie ? movie : structuredClone(defaultMovie),
	);

	useEffect(() => {
		// If the movie is not found, we are creating a new one
		if (!movie) {
			setCreating(true);
			movieRef.current = structuredClone(defaultMovie);
			setInitial(structuredClone(defaultMovie));
		} else {
			setCreating(false);
			movieRef.current = movie;
			setInitial(movie);
		}
	}, [movie, isLoading]);

	// Props for genre selection dropdown
	const genreDropdownProps = useGenreDropdown(movieRef, initial.genres || []);

	// Props for movie rating
	const ratingSliderProps = useRatingSlider(movieRef, initial.rating || 0);

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<FormLayout
			title={!creating ? "Edit Movie" : "Add Movie"}
			ref={movieRef}
			submitFunction={
				!creating ?
					async (ref: Movie) =>
						await SubmitMovie(ref, true, movie!.identifier!)
				:	async (ref: Movie) => await SubmitMovie(ref, false)
			}
			errorModalMessage={"Please fill in all required fields."}
			successModalMessage={
				!creating ?
					"Movie updated successfully."
				:	"Movie added successfully."
			}
		>
			<FormSection title={"Basic Information"}>
				<InputOption
					title={"Title *"}
					initial={initial.title!}
					onChange={(value) => (movieRef.current.title = value)}
				/>
				<TextAreaOption
					title={"Short Description"}
					initial={initial.shortDescription || ""}
					onChange={(value) =>
						(movieRef.current.shortDescription = value)
					}
				/>
			</FormSection>
			<FormSection title={"Additional Information"}>
				<DropdownCheckboxOption
					props={genreDropdownProps}
					title={"Genres *"}
				/>
				<SliderOption props={ratingSliderProps} title={"Rating"} />
			</FormSection>
			<FormSection title={"Media Files"}>
				<FileBrowseOption
					title={"Thumbnail"}
					allowed={"image"}
					initial={
						ImagePathToURL(movieRef.current.thumbnailUrl).isLocal ?
							movieRef.current.thumbnailUrl || ""
						:	"External URL"
					}
					onChange={(value) =>
						(movieRef.current.thumbnailUrl = value)
					}
				/>
				<FileBrowseOption
					title={"Video File"}
					allowed={"video"}
					initial={movieRef.current.videoUrl || ""}
					onChange={(value) => (movieRef.current.videoUrl = value)}
				/>
			</FormSection>
		</FormLayout>
	);
}
