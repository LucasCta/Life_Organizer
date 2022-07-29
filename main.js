const { app, BrowserWindow, Tray, Menu } = require('electron');

const startup = () => {
    const myWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {nodeIntegration: true},
        frame: false,
        icon: 'icon.png'
    }); myWindow.loadFile('index.html');
    const tray = new Tray('icon.png');
    tray.setToolTip('lifeorganizer');
    const contextMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(contextMenu);
};

app.on('ready', startup);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});
