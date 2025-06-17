import { app, BrowserWindow } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEV_SERVER_URL = 'http://localhost:5173';
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PATH = `file://${join(__dirname, '../dist/index.html')}`

function createWindow() {
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });

    const isDev = !app.isPackaged;
    const startUrl = isDev ? DEV_SERVER_URL : DIST_PATH;

    mainWindow.loadURL(startUrl);
}

app.on('ready', () => {
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