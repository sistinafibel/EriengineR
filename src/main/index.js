import url from 'url'
import path from 'path'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'

import Modal from './Modal/modal'

import IPC_MENU from './Menu/ipc'
import IPC_TERMINAL from './Terminal/ipc'
import IPC_VAR from './Variables/ipc'

import electronDevtoolsInstaller from 'electron-devtools-installer';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let winURL
let variables

winURL = process.env.NODE_ENV === 'development' ?

  url.format({
    protocol: 'http',
    hostname: 'localhost',
    pathname: '/',
    port: 9080,
    hash: '/engine'
  }) :

  url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'index.html'),
    hash: '/engine'
  })

variables = {}


function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 560,
    width: 1000,
    icon: path.join(__dirname, '../assets/image/ico.ico')
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })


  IPC_MENU(mainWindow)
  IPC_TERMINAL(mainWindow)
  IPC_VAR(variables)

  ipcMain.emit('menu-disable')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */