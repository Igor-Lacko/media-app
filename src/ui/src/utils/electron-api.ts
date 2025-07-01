/**
 * Just for convenience (despite the weirdeness of this)
 * Since VsCode does not recognize window.electron
 */
declare global {
    interface Window {
        electron?: {
            getFilePath: () => Promise<string | null>;
            isValidFile: (filePath: string) => Promise<boolean>;
        };
    }
}

/**
 * Invokes electron's IPC to get a file path from the user.
 * @returns File path as a string or null if no file was selected.
 */
export async function GetFilePath(): Promise<string | null> {
    if (!window.electron || !window.electron.getFilePath) {
        return null;
    }

    return await window.electron.getFilePath();
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