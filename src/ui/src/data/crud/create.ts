import axios from "axios";

/**
 * Creates a new data entry. Used for "top-level" models, e.g. models that are not nested within other models.
 * @param url Url to POST to
 * @param data Data to insert
 * @returns Promise that resolves to the created data entry
 */
export async function CreateData<T>(url: string, data: T): Promise<T> {
    try {
        const response = await axios.post<T>(url, data);
        return response.data;
    } catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}
