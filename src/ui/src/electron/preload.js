const { contextBridge, ipcRenderer } = require('electron');

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electron', {
    getFilePath: async (extensions) => {
        const paths = await ipcRenderer.invoke('get-file', extensions);
        return paths && paths.length > 0 ? paths[0] : null; // Return the first file path
    },

    isValidFile: async (filePath) => {
        console.log(`Checking if file exists: ${filePath}`);
        return await ipcRenderer.invoke('check-file-exists', filePath);
    },

    isValidVideo: async (filePath) => {
        return await ipcRenderer.invoke('is-valid-video', filePath);
    }
});