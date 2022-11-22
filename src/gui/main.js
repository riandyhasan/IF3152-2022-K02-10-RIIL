const { app, BrowserWindow, dialog } = require('electron')
const electronIpcMain = require('electron').ipcMain;
const path = require('path')
// const spawn = require('child_process').spawn;
const {PythonShell} =require('python-shell');

let win;

const options = {
  mode: 'text',
  pythonPath: process.platform == 'win32' || process.platform == 'win64' ? './env/Scripts/python.exe' : './env/bin/python3.9',
  pythonOptions: ['-u'],
  scriptPath: './src/databases/',
};

const pyshell = PythonShell.run('app.py', options, function (err, results) {
  if (err) 
    throw err;
  // Results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});

// const process = spawn('./env/Scripts/python.exe', ['./src/databases/app.py'])
// var responseData = "";

// process.stdout.setEncoding('utf-8');
// process.stdout.on('data', function (data){
//     responseData += data.toString();
// });
// process.stderr.on('data', function (data){
//   responseData += data.toString();
// });
// process.stdout.on('end',function(data){
//   console.log(responseData);
// });

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