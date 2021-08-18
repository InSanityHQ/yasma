const { app, BrowserWindow, systemPreferences, nativeTheme, ipcMain, Menu, shell } = require('electron');
const { autoUpdater } = require("electron-updater");
autoUpdater.checkForUpdatesAndNotify();
const path = require('path');
const isDev = require('electron-is-dev');

setInterval(()=>{
    autoUpdater.checkForUpdatesAndNotify();
}, 15000);



function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        'width': 1000,
        'height': 650,
        'minWidth': 400,
        'minHeight': 650,
        'title': "Condution",
        'webPreferences': {
            'nodeIntegration': true
        },
        'titleBarStyle': 'hiddenInset',
        'transparent': true,
        'show': false,
    });

    // TODO TODO TODO UNCOMMENT THIS!!
    win.removeMenu();
    // and load the main of the app.
    if (isDev)
        win.loadURL(`http://localhost:3000`);
    else
        win.loadURL(`file://${path.join(__dirname, './build/index.html')}`);

    win.webContents.setWindowOpenHandler(({ url }) => {
        // config.fileProtocol is my custom file protocol
        if (url.startsWith("http") || url.startsWith("https")) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    win.once('ready-to-show', function() {
        win.show()
    });
}

app.name = 'yasma';
app.whenReady().then(createWindow);

