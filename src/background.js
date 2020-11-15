'use strict'
/* global __static */
import { app, protocol, BrowserWindow, ipcMain, Menu, Tray, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import ipcTaskEvents from '@/db/ipcEvents/ipcTaskEvents'
import ipcUserEvents from '@/db/ipcEvents/ipcUserEvents'
import ipcProjectEvents from '@/db/ipcEvents/ipcProjectEvents'
import ipcDailyStatusEvents from '@/db/ipcEvents/ipcDailyStatusEvents'

var path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'
const { autoUpdater } = require("electron-updater")
autoUpdater.checkForUpdatesAndNotify()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let isQuiting = false;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  function createWindow() {
    

    // Create the browser window.
    win = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        webSecurity: false
      }
    })

    win.maximize();

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL('app://./index.html')
    }

    // win.on('close', (event) => {
    //   event.preventDefault();
    //   win.hide();
    // })

    win.on('minimize',function(event){
      event.preventDefault();
      win.hide();
    });

    win.on('show', function () {
      // tray.setHighlightMode('always')
      win.maximize();
    })

    win.on('close', function (event) {
        if(!isQuiting){
            event.preventDefault();
            win.hide();
        }

        return false;
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);



    var tray = new Tray(path.join(__static, '/icon.ico'));
    var contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Show App', 
        click:  function(){
          win.show();
        } 
      },
      { 
        label: 'Quit', 
        click:  function(){
          isQuiting = true;
          app.quit();
        } 
      }
    ])
    // tray.on('click', tray.popUpContextMenu);
    tray.setContextMenu(contextMenu)
    tray.setToolTip('cv-project-manager');

    const activationShortcut = globalShortcut.register(
      'CommandOrControl+C+V',
      () => { tray.popUpContextMenu(); }
    );

    new ipcTaskEvents().init(ipcMain, win)
    new ipcProjectEvents().init(ipcMain, win)
    new ipcUserEvents().init(ipcMain, win)
    new ipcDailyStatusEvents().init(ipcMain, win)
    
  }

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      // app.quit()
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

  // Create a menu template
  const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
          { role: 'quit' }
        ]
      },
      {
        label: 'About',
        submenu: [
          { 
            label: 'Version ' + app.getVersion(),
            click: async () => {
            }
          }
        ]
      }
  ];

  // Add developer tools item if not in prod
  if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle devtools",
                click(item, focussedWindow){
                    focussedWindow.toggleDevTools();
                }
            },
            {
                role: "reload"
            }
        ]
        
    });
  }
}
