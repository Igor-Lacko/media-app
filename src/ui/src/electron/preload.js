const { contextBridge, ipcRenderer } = require('electron');

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electron', {
    getFilePath: async () => {
        const paths = await ipcRenderer.invoke('get-file');
        return paths && paths.length > 0 ? paths[0] : null; // Return the first file path
    }
});