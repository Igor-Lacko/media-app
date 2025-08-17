import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
const UI_SERVER_URL = isDev
	? "http://localhost:5173/"
	: `file://${join(process.resourcesPath, "ui-dist", "index.html")}`;

// This only runs when packaged
async function startApiServer() {
	const dbPath = join(process.resourcesPath, "prisma", "database.db");
	const apiPath = join(process.resourcesPath, "api-dist", "main.js");
	if (!existsSync(dbPath) || !existsSync(apiPath)) {
		console.error("API server files not found:", dbPath, apiPath);
		return;
	}
	process.env.DATABASE_URL = `file:${dbPath}`;
	await import(apiPath);
}

/**
 * Creates a window and starts the React UI.
 */
function createWindow() {
	const mainWindow = new BrowserWindow({
		titleBarStyle: "hidden",
		fullscreen: true,
		fullscreenable: true,
		webPreferences: {
			preload: join(__dirname, "/preload.js"),
			contextIsolation: true,
			nodeIntegration: false,

			// Local files
			webSecurity: false,
		},
	});

	mainWindow.loadURL(UI_SERVER_URL);
}

// Gets a absolute file path, allows only files ending with "extensions" to be selected
ipcMain.handle("get-file", async (_event, allowed) => {
	const extensions =
		allowed === "video"
			? ["mp4", "mkv", "avi", "mov"]
			: allowed === "image"
				? ["jpg", "jpeg", "png", "gif"]
				: ["*"];
	const result = await dialog.showOpenDialog({
		properties: ["openFile"],
		filters: [
			{
				name: "Files",
				extensions: extensions,
			},
		],
	});
	return result.filePaths;
});

// Checks if a file exists
ipcMain.handle("check-file-exists", async (event, filePath) => {
	return existsSync(filePath);
});

// Checks if a file is a valid video
ipcMain.handle("is-valid-video", async (_event, filePath) => {
	const validExtensions = [".mp4", ".mkv", ".avi", ".mov"];
	return validExtensions.some((ext) => filePath.endsWith(ext));
});

// Opens a external browser
ipcMain.handle("open-external", async (_event, url) => {
	shell.openExternal(url);
});

app.whenReady().then(async () => {
	createWindow();
	if (!isDev) {
		await startApiServer();
	}

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
