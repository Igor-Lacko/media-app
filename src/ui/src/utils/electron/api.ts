/**
 * Just for convenience (despite the weirdeness of this)
 * Since VsCode does not recognize window.electron
 */
declare global {
    interface Window {
        electron?: {
            getFilePath: () => Promise<string | null>;
        };
    }
}