import Movie from "@shared/interface/models/movie";
import { CreateData } from "data/crud/create";

/**
 * Validates and submits a movie object to the server.
 * @param movie Movie object to be submitted.
 * @returns A promise that resolves to true if the submission was successful, false otherwise.
 */
export default async function SubmitMovie(movie: Movie): Promise<boolean> {
    // These have to exist
    if (movie.title === "" || movie.genres!.length === 1) {
        console.log(movie);
        return false;
    }

    console.log("Submitting movie:", movie);
    // Create and return
    try {
        await CreateData<Movie>("/api/movies", movie);
        return true;
    } 

    catch (error) {
        console.error("Error submitting movie:", error);
        return false;
    }
}
