import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  console.log(app.isPackaged);
  if (process.env.NODE_ENV !== "development") {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }

  win.webContents.openDevTools();

  ipcMain.on("message", (_, num) =>{
    console.log(num, '来了')
  })

  setTimeout(() => {
    win.webContents.send('load',{message:'初始化完成'})
  }, 3000)
};

// app.whenReady().then(createWindow)
app.whenReady().then(() => {
  createWindow()

  app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow()
    }
  })
})
app.on('window-all-closed', () =>{
  if (process.platform !== 'darwin') {
    app.quit()
  }
})