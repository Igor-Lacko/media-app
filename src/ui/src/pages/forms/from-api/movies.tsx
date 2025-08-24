import { CreateMovieFromOMDb } from "data/crud/create";
import { OpenExternal } from "electron/electron-api";
import ApiFormLayout from "layouts/api-form-layout";

/**
 * Form page for adding movies from the OMDb API.
 * Contains basically just a go back button and a input.
 */
export default function OMDbMovieForm() {
	return (
		<ApiFormLayout
			title={"Add Movie from OMDb"}
			onSubmit={CreateMovieFromOMDb}
			placeholders={{ title: "Movie Title", imdbId: "IMDb ID" }}
			successModalTitle={"Movie added successfully"}
			successModalMessage={"The movie has been added to your collection."}
			errorModalTitle={"Error adding movie"}
			attributionComponent={
				<span
					className={"text-gray-500 dark:text-gray-400 text-lg mb-4"}
				>
					This form uses the
					<button
						className={
							"text-blue-500 dark:text-blue-400 hover:underline mx-1 cursor-pointer"
						}
						onClick={async () =>
							await OpenExternal("https://www.omdbapi.com")
						}
					>
						OMDB API
					</button>
					to fetch movie data.
				</span>
			}
		/>
	);
}
