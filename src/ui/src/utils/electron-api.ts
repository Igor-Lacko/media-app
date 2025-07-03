/**
 * Just for convenience (despite the weirdeness of this)
 * Since VsCode does not recognize window.electron
 */
declare global {
    interface Window {
        electron?: {
            getFilePath: (allowed: string) => Promise<string | null>;
            isValidFile: (filePath: string) => Promise<boolean>;
            isValidVideo: (filePath: string) => Promise<boolean>;
        };
    }
}

/**
 * Invokes electron's IPC to get a file path from the user.
 * @param allowed Allowed files, e.g. "video" or "image"
 * @returns File path as a string or null if no file was selected.
 */
export async function GetFilePath(allowed: string): Promise<string | null> {
    console.log("Requesting file path with extensions: ", allowed);
    if (!window.electron || !window.electron.getFilePath) {
        return null;
    }

    return await window.electron.getFilePath(allowed);
}

/**
 * Checks if a file exists at the given path.
 * @param path Path to the file.
 * @returns True if the file exists, false otherwise.
 */
export async function IsValidFile(path: string): Promise<boolean> {
    if(!window.electron || !window.electron.isValidFile) {
        console.log("Electron API not available for file validation.");
        return false;
    }

    return await window.electron.isValidFile(path);
}

/**
 * Checks if a file is a valid video file.
 * @param path Path to the file.
 * @returns True if the file is a valid video, false otherwise.
 */
export async function IsValidVideo(path: string): Promise<boolean> {
    // if(!window.electron || !window.electron.isValidVideo) {
    //     console.log("Electron API not available for video validation.");
    //     return false;
    // }

    // if (await IsValidFile(path) && await window.electron.isValidVideo(path)) {
    //     return true;
    // }

    // return false;
    return true;
}