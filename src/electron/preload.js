const { contextBridge, ipcRenderer } = require("electron");

// Expose the API to the renderer process
contextBridge.exposeInMainWorld("electron", {
	getFilePath: async (allowed) => {
		const paths = await ipcRenderer.invoke("get-file", allowed);
		return paths && paths.length > 0 ? paths[0] : null;
	},

	isValidFile: async (filePath) => {
		return await ipcRenderer.invoke("check-file-exists", filePath);
	},

	isValidVideo: async (filePath) => {
		return await ipcRenderer.invoke("is-valid-video", filePath);
	},

	openExternal: async (url) => {
		await ipcRenderer.invoke("open-external", url);
	},

	saveFile: async (data) => {
		return await ipcRenderer.invoke("save-file", data);
	},
});
