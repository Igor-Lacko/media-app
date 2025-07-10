import axios from "axios";

/**
 * Deletes a data entry by its ID.
 * @param url URL to send the DELETE request to.
 * @param id ID of the data entry to delete.
 * @return Promise resolving to true if the deletion was successful, false otherwise.
 */
export default async function DeleteData(url : string, id : number) : Promise<boolean> {
    try {
        await axios.delete(`${url}/${id}`);
        return true;
    }

    catch (error) {
        console.error("Error deleting data:", error);
        return false;
    }
}

/**
 * Deletes the OMDB API key from the settings.
 * @returns An object indicating success or failure, with an optional error message.
 */
export async function DeleteAPIKey(): Promise<{ success: boolean, errorMessage?: string }> {
    try {
        const response = await axios.delete("/api/settings/omdb-key");
        if (response.status === 200) {
            return { success: true };
        }

        else {            
            return { success: false, errorMessage: response.statusText || "Failed to delete OMDB key" };
        }
    }

    catch (error) {
        console.error("Error deleting OMDB key:", error);
        return { success: false, errorMessage: error instanceof Error ? error.message : "Unknown error" };
    }
}


export async function ResetDatabase(): Promise<boolean> {
    try {
        const response = await axios.delete("/api/settings");
        return response.status === 200;
    }

    catch (error) {
        console.error("Error resetting database:", error);
        return false;
    }
}