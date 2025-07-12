import { CreateTvShowFromTvMaze } from "data/crud/create";
import ApiFormLayout from "layouts/api-form-layout";

/**
 * Form page for adding TV shows from the TVmaze API.
 */
export default function TvMazeShowForm() {
    return <ApiFormLayout
        title={"Add TV Show from TVmaze"}
        onSubmit={CreateTvShowFromTvMaze}
        placeholders={{ title: "TV Show Title", imdbId: "IMDb ID" }}
        successModalTitle={"TV Show added successfully"}
        successModalMessage={"The TV show has been added to your collection."}
        errorModalTitle={"Error adding TV show"}
    />;
}