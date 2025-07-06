import { app, BrowserWindow, protocol, net, ipcMain, dialog } from 'electron';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEV_SERVER_URL = 'http://localhost:5173/';
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PATH = `file://${join(__dirname, '../dist/index.html')}`

protocol.registerSchemesAsPrivileged([
    { scheme: 'local', privileges: { stream: true, bypassCSP: true, } }
]);


function createWindow() {
    const isDev = !app.isPackaged;
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        height: 600,
        width: 800,
        webPreferences: {
            preload: join(__dirname, 'electron/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            webSecurity: !isDev
        },
    });

    const startUrl = isDev ? DEV_SERVER_URL : DIST_PATH;

    mainWindow.loadURL(startUrl);
}

// Gets a absolute file path, allows only files ending with "extensions" to be selected
ipcMain.handle('get-file', async (event, allowed) => {
    const extensions = allowed === "video" ? ['mp4', 'mkv', 'avi', 'mov'] :
                        allowed === "image" ? ['jpg', 'jpeg', 'png', 'gif'] :
                        ["*"];
    console.log(`Opening file dialog with extcxcxzensions: ${extensions}`);
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
    console.log(`Checking if file exists: ${filePath}`);
    return existsSync(filePath);
});

// Checks if a file is a valid video
ipcMain.handle('is-valid-video', async (event, filePath) => {
    const validExtensions = ['.mp4', '.mkv', '.avi', '.mov'];
    return validExtensions.some(ext => filePath.endsWith(ext));
})

app.whenReady().then(() => {
    // To access local files (from https://stackoverflow.com/questions/50272451/electron-js-images-from-local-file-system)
    protocol.handle('local', function(request) {
        return net.fetch('file://' + request.url.slice('local://'.length));
    });

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