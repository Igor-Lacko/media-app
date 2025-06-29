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