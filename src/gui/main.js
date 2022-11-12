const { app, BrowserWindow, dialog } = require('electron')
const electronIpcMain = require('electron').ipcMain;
const path = require('path')
const spawn = require('child_process').spawn;

let win;

const python = spawn('py', ['/src/databases/app.py'])
python.stdout.on('data', function (data) {
  console.log("Ada kok")
});

function createWindow () {
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    resizable: false,
    icon: './img/logo-riil-square.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, '/preload.js'),
    }
  })

  win.loadFile(__dirname + '/pages/Login/index.html')
}

function openPage(path) {
  win.loadFile(__dirname + path) 
  .then(() => { win.show(); })
}

function showAlert(title, message){
  dialog.showMessageBox({
    title: "RIIL",
    message: title,
    detail: message,
    buttons: ['Ok'],
    icon: './img/logo-riil-square.ico',
   });
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
electronIpcMain.on('homeShow', () => {
  openPage('/pages/Home/index.html');
});

electronIpcMain.on('alertShow', () => {
  showAlert("test", "dasd");
})