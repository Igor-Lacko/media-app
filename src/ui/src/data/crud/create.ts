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