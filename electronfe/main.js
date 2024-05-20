const { app, BrowserWindow } = require("electron");
const path = require("path");

const isMac = process.platform === "darwin";
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // win.loadFile(path.join(__dirname, "./renderer/index.html"));
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
