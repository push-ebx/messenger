const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
let win, is_focus
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // titleBarStyle: 'hidden',
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  win.setMenu(null)
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools()

  win.on('focus', () => {
    console.log('window got focus')
    is_focus = true
  })

  win.on('blur', () => {
    console.log('window blur')
    is_focus = false
  })
}

app.setAppUserModelId(process.execPath)
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ipcMain.on("toMain", (event, args) => {
//   win.webContents.send("fromMain", is_focus);
// });
//
// win.webContents.send("fromMain", 'is_focus');