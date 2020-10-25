'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const { autoUpdater } = require("electron-updater")
autoUpdater.checkForUpdatesAndNotify()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()  
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


const mysqlhelper = require('@/db/mysqlhelper');

ipcMain.on('tasks:get', function(e){
    mysqlhelper.default.getTasks(function(tasks){
        win.webContents.send('tasks:success', tasks)
    })
})
ipcMain.on('tasks:getuserassigned', function(e, userId){
  mysqlhelper.default.getTasksAssignedToUser(userId, function(tasks){
      win.webContents.send('tasks:userassignedsuccess', tasks)
  })
})
ipcMain.on('task:submit', function(e, data){    
  mysqlhelper.default.saveTask(data, function(data){
    win.webContents.send('task:submitsuccess', data)
  })
})
ipcMain.on('task:delete', function(e, id){
  mysqlhelper.default.deleteTask(id, function(response){
      win.webContents.send('task:deletesuccess', response)
  })
})

ipcMain.on('projects:get', function(e){
  mysqlhelper.default.getProjects(function(projects){
      win.webContents.send('projects:success', projects)
  })
})
ipcMain.on('project:edit', function(e, data){
  mysqlhelper.default.editProject(data, function(response){
      win.webContents.send('project:editsuccess', response)
  })
})
ipcMain.on('project:delete', function(e, id){
  mysqlhelper.default.deleteProject(id, function(response){
      win.webContents.send('project:deletesuccess', response)
  })
})

ipcMain.on('login:submit', function(e, data){    
    mysqlhelper.default.login(data.username, data.password, function(data){
      win.webContents.send('login:success', data)
    })
})

ipcMain.on('todaysdailystatus:get', function(e, userId){    
  mysqlhelper.default.gettodaysdailystatus(userId, function(data){
    win.webContents.send('todaysdailystatus:success', data)
  })
})

ipcMain.on('yesterdaysdailystatus:get', function(e, userId){    
  mysqlhelper.default.getyesterdaysdailystatus(userId, function(data){
    win.webContents.send('yesterdaysdailystatus:success', data)
  })
})

ipcMain.on('dailystatus:submit', function(e, data){    
  mysqlhelper.default.savedailystatus(data, function(data){
    win.webContents.send('dailystatus:success', data)
  })
})

ipcMain.on('project:new', function(e, data){    
  mysqlhelper.default.saveproject(data, function(data){
    win.webContents.send('project:newsuccess', data)
  })
})

ipcMain.on('users:get', function(e){
  mysqlhelper.default.getUsers(function(users){
      win.webContents.send('users:success', users)
  })
})

