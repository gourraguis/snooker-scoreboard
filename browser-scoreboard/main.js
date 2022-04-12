const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
 
const path = require('path')
const url = require('url')
 
function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({width: 800, height: 600})
 
  // and load the index.html of the app.
  win.loadURL("https://client.jawad.club/?id=0012022")
}
app.on('ready', createWindow)