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

    const path = await window.electron.getFilePath();
    return path;
}