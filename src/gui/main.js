const { app, BrowserWindow } = require('electron')
const electronIpcMain = require('electron').ipcMain;
const path = require('path')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    resizable: false,
    icon: './img/logo-riil-square.ico',
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  })

  win.loadFile(__dirname + '/pages/Login/index.html')
}

function openPage(path) {
  win.loadFile(__dirname + path) 
  .then(() => { win.show(); })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC
electronIpcMain.on('homeShow', e => {
  openPage('/pages/Home/index.html');
})
