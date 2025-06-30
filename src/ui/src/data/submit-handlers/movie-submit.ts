import Movie from "@shared/interface/models/movie";
import { CreateData } from "data/crud/create";
import UpdateData from "data/crud/update";

/**
 * Validates and submits a movie object to the server.
 * @param movie Movie object to be submitted.
 * @param updating Indicates whether the movie is being updated or created.
 * @param id Identifier of the movie to update, if it has to be used.
 * @returns A promise that resolves to true if the submission was successful, false otherwise.
 */
export default async function SubmitMovie(movie: Movie, updating: boolean, id: number = 0): Promise<boolean> {
    // These have to exist
    if (movie.title === "" || movie.genres!.length === 1) {
        return false;
    }

    // Create/update and return
    try {
        if (updating) {
            await UpdateData<Movie>("api/movies", id, movie);
        } 

        else {
            await CreateData<Movie>("api/movies", movie);
        }

        return true;
    }

    catch (error) {
        console.error("Error submitting movie:", error);
        return false;
    }
}
