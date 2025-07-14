import { app, BrowserWindow, protocol, net, ipcMain, dialog, shell } from 'electron';
import { existsSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const SERVER_URL = 'http://localhost:5173/';
const __dirname = dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        height: 600,
        width: 800,
        webPreferences: {
            preload: join(__dirname, '/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,

            // Local files
            webSecurity: false
        },
    });

    mainWindow.loadURL(SERVER_URL);
}

// Gets a absolute file path, allows only files ending with "extensions" to be selected
ipcMain.handle('get-file', async (event, allowed) => {
    const extensions = allowed === "video" ? ['mp4', 'mkv', 'avi', 'mov'] :
                        allowed === "image" ? ['jpg', 'jpeg', 'png', 'gif'] :
                        ["*"];
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: 'Files',
                extensions: extensions
            }
        ]
    });
    return result.filePaths; 
});

// Checks if a file exists
ipcMain.handle('check-file-exists', async (event, filePath) => {
    return existsSync(filePath);
});

// Checks if a file is a valid video
ipcMain.handle('is-valid-video', async (event, filePath) => {
    const validExtensions = ['.mp4', '.mkv', '.avi', '.mov'];
    return validExtensions.some(ext => filePath.endsWith(ext));
})

// Opens a external browser
ipcMain.handle('open-external', async (event, url) => {
    shell.openExternal(url);
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});