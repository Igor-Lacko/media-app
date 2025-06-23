import { app, BrowserWindow, protocol, net, ipcMain, dialog } from 'electron';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEV_SERVER_URL = 'http://localhost:5173/';
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PATH = `file://${join(__dirname, '../dist/index.html')}`

function createWindow() {
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: join(__dirname, 'electron/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    });

    const isDev = !app.isPackaged;
    const startUrl = isDev ? DEV_SERVER_URL : DIST_PATH;

    mainWindow.loadURL(startUrl);
}

// Gets a absolute file path
ipcMain.handle('get-file', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile']
    });
    return result.filePaths; 
});

app.whenReady().then(() => {
    // To access local files (from https://stackoverflow.com/questions/50272451/electron-js-images-from-local-file-system)
    protocol.handle('local', async (request, callback) => {
        const filePath = request.url.replace(`local://`, 'file://');
        return net.fetch(filePath);
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