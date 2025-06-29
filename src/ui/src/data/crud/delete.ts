import axios from "axios";

/**
 * Deletes a data entry by its ID.
 * @param url URL to send the DELETE request to.
 * @param id ID of the data entry to delete.
 * @throws Error if the deletion fails.
 */
export default async function DeleteData(url : string, id : number) : Promise<void> {
    try {
        await axios.delete(`${url}/${id}`);
    }

    catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
}