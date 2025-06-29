import axios from "axios";

/**
 * Creates a new data entry. Used for "top-level" models, e.g. models that are not nested within other models.
 * @param url Url to POST to
 * @param data Data to insert
 * @throws Error if the request fails
 */
export async function CreateData<T>(url: string, data: T): Promise<void> {
    try {
        await axios.post<T>(url, data);
    } 

    catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}
