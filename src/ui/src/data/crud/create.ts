import axios from "axios";

/**
 * Creates a new data entry. Used for "top-level" models, e.g. models that are not nested within other models.
 * @param url Url to POST to
 * @param data Data to insert
 * @return Promise resolving to true if the creation was successful, false otherwise.
 */
export async function CreateData<T>(url: string, data: T): Promise<boolean> {
    try {
        await axios.post<T>(url, data);
        return true;
    } 

    catch (error) {
        console.error("Error creating data:", error);
        return false;
    }
}

/**
 * Creates a new data entry with a specific foreign key id, for example when creating a season for a TV show.
 * @param url Url to POST to
 * @param data Data to insert
 * @param id Foreign key id to associate with the data
 * @return Promise resolving to true if the creation was successful, false otherwise.
 * */
export async function CreateDataWithId<T>(url: string, data: T, id: number): Promise<boolean> {
    try {
        await axios.post<T>(`${url}/${id}`, data);
        return true;
    } 

    catch (error) {
        console.error("Error creating data with ID:", error);
        return false;
    }
}

/**
 * Creates a movie from OMDb by title.
 * @param title Title of the movie to create.
 * @param imdbId Optional IMDb ID of the movie to create. Has precedence.
 * @return Promise resolving to an object indicating success or failure, with an optional error message.
 */
export async function CreateMovieFromOMDb(title?: string, imdbId?: string): Promise<{ success: boolean, errorMessage?: string }> {
    try {
        const response = await axios.post(`/api/movies/omdb`, { title, imdbId });
        if (response.status === 201) {
            return { success: true };
        }

        return {
            success: false,
            errorMessage: response.data.error || "Failed to create movie from OMDb"
        };
    }

    catch (error) {
        if (axios.isAxiosError(error)) {
            const errorResponse = error.response?.data as { error: string };
            return {
                success: false,
                errorMessage: errorResponse?.error || "Failed to create movie from OMDb"
            };
        }

        return {            
            success: false,
            errorMessage: "An unexpected error occurred while creating movie from OMDb"
        };        
    }
}

/**
 * Creates a TV show from TV Maze by title or IMDb ID.
 * @param title Title of the TV show to create.
 * @param imdbId IMDb ID of the TV show to create. Has precedence.
 * @note At least one of title or imdbId must be provided.
 * @return Promise resolving to an object indicating success or failure, with an optional error message.
 */
export async function CreateTvShowFromTvMaze(title?: string, imdbId?: string): Promise<{ success: boolean, errorMessage?: string }> {
    return await axios.post(`/api/shows/tv-maze`, { title, imdbId })
    .then((response) => {
        if (response.status === 201) {
            return { success: true };
        }

        return {
            success: false,
            errorMessage: response.data.error || "Failed to create TV show from TV Maze"
        };
    })
    .catch((error) => {
        if (axios.isAxiosError(error)) {
            console.error("Error creating TV show from TV Maze:", error);
            const errorResponse = error.response?.data as { error: string };
            return {
                success: false,
                errorMessage: errorResponse?.error || "Failed to create TV show from TV Maze"
            };
        }

        return {            
            success: false,
            errorMessage: "An unexpected error occurred while creating TV show from TV Maze"
        };        
    });
}