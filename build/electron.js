const {
  app,
  BrowserWindow,
} = require('electron') // 引入electron

const ipc = require('electron').ipcMain
const path = require('path') // 引入文件路径处理插件
const electron = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow // 定义桌面应用窗口

ipc.on('min', e=> mainWindow.minimize());
ipc.on('max', e=> {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize()
    }
});
ipc.on('close', e=> mainWindow.close());
ipc.on('show-window', e=> {
  mainWindow.setSize(1078,728);
  mainWindow.center();
});
// 创建桌面应用窗口
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    // movable:false,
    maximizable:false,
    useContentSize: true,
    center:true,
    width: 375, // 初始宽度 
    height: 571, // 初始高度
    webPreferences: {
      nodeIntegration: true, // 可以使用nodejs原生api
    }
  })
  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:8080/#/login");
  // mainWindow.loadFile("../dist/index.html");                                                         


  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  
  // Emitted when the window is closed.
  // 定义窗口关闭后回调方法，关闭主进程
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 项目就绪后创建窗口
app.on('ready', createWindow)

// Quit when all windows are closed.
// 所有的窗口页面关闭后，退出应用
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
// 创建窗口
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
