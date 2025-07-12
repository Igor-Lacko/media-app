import { CreateMovieFromOMDb } from "data/crud/create";
import ApiFormLayout from "layouts/api-form-layout";

/**
 * Form page for adding movies from the OMDb API.
 * Contains basically just a go back button and a input.
 */
export default function OMDbMovieForm() {
    return <ApiFormLayout
        title={"Add Movie from OMDb"}
        onSubmit={CreateMovieFromOMDb}
        placeholders={{ title: "Movie Title", imdbId: "IMDb ID" }}
        successModalTitle={"Movie added successfully"}
        successModalMessage={"The movie has been added to your collection."}
        errorModalTitle={"Error adding movie"}
    />;
}