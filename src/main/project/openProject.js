import path from 'path'
import fs from 'fs-extra'

import {
  dialog,
  app,
  ipcMain
} from 'electron'

import getResolvedURI from '@static/js/getResolvedURI'


export default async function openProject(e, esproject) {

  let winURL

  try {

    this.variables.project.directory = path.dirname(esproject)
    this.variables.project.information_file = esproject
    this.variables.project.information.set(fs.readJSONSync(esproject))

  } catch (e) {

    dialog.showErrorBox(e.message, e.stack)
    app.exit(1)

  }

  winURL = getResolvedURI(this.webContents.getURL(), '/engine')

  this.setResizable(true)
  this.loadURL(winURL)
  this.maximize()

}