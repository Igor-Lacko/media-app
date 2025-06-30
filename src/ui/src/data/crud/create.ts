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
