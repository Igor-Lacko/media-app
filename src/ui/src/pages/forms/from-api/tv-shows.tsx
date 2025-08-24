import { CreateTvShowFromTvMaze } from "data/crud/create";
import { OpenExternal } from "electron/electron-api";
import ApiFormLayout from "layouts/api-form-layout";

/**
 * Form page for adding TV shows from the TVmaze API.
 */
export default function TvMazeShowForm() {
	return (
		<ApiFormLayout
			title={"Add TV Show from TV Maze API"}
			onSubmit={CreateTvShowFromTvMaze}
			placeholders={{ title: "TV Show Title", imdbId: "IMDb ID" }}
			successModalTitle={"TV Show added successfully"}
			successModalMessage={
				"The TV show has been added to your collection."
			}
			errorModalTitle={"Error adding TV show"}
			attributionComponent={
				<span
					className={"text-gray-500 dark:text-gray-400 text-lg mb-4"}
				>
					This form uses the TVmaze API to fetch TV show data. You can
					find more information about the API at
					<button
						className={
							"text-blue-500 dark:text-blue-400 hover:underline mx-1 cursor-pointer"
						}
						onClick={async () =>
							await OpenExternal("https://www.tvmaze.com/api")
						}
					>
						https://www.tvmaze.com/api.
					</button>
				</span>
			}
		/>
	);
}
