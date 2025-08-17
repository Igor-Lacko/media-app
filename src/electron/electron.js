import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";
const UI_SERVER_URL = isDev
	? "http://localhost:5173/"
	: `file://${join(__dirname, "../ui/dist/index.html")}`;

console.log("UI Server URL:", UI_SERVER_URL);

let api = undefined;

/**
 * Starts the API Express server (in production).
 */
function startServer() {
	const exePath = join(__dirname, "../api/build/media-api");
	if (!existsSync(exePath)) {
		console.error("API server executable not found:", exePath);
		return;
	}

	api = spawn(exePath, {
		cwd: join(__dirname, "../api/build"),
		shell: true,
		env: {
			...process.env,
			DATABASE_URL: `file:${join(__dirname, "../api/prisma/database.db")}`,
		}
	});

	api.stdout.on("data", (data) => {
		console.log(`API stdout: ${data}`);
	});

	api.stderr.on("data", (data) => {
		console.error(`API stderr: ${data}`);
	});

	api.on("error", (error) => {
		console.error("API process error:", error);
	});

	api.on("exit", (code) => {
		console.log(`API process exited with code: ${code}`);
	});
}

/**
 * Stops the API Express server.
 */
function stopServer() {
	if (api) {
		console.log("Stopping API server...");
		api.kill("SIGTERM");
		api = undefined;
	}
}

/**
 * Creates a window and starts the React UI.
 */
function createWindow() {
	const mainWindow = new BrowserWindow({
		titleBarStyle: "hidden",
		height: 600,
		width: 800,
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
ipcMain.handle("get-file", async (event, allowed) => {
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
ipcMain.handle("is-valid-video", async (event, filePath) => {
	const validExtensions = [".mp4", ".mkv", ".avi", ".mov"];
	return validExtensions.some((ext) => filePath.endsWith(ext));
});

// Opens a external browser
ipcMain.handle("open-external", async (event, url) => {
	shell.openExternal(url);
});

app.whenReady().then(() => {
	if (!isDev) {
		startServer();
	}

	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (!isDev) {
		stopServer();
	}
	if (process.platform !== "darwin") {
		app.quit();
	}
});
