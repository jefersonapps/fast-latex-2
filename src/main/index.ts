import { app, shell, BrowserWindow, ipcMain, clipboard, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const {
  getColorHexRGB,
  DARWIN_IS_PLATFORM_PRE_CATALINA,
  darwinGetScreenPermissionGranted,
  darwinRequestScreenPermissionPopup
} = require('electron-color-picker')

const captureColor = async (): Promise<string> => {
  if (process.platform === 'darwin' && !DARWIN_IS_PLATFORM_PRE_CATALINA) {
    const isGranted = await darwinGetScreenPermissionGranted()
    if (!isGranted) {
      await darwinRequestScreenPermissionPopup()
      return ''
    }
  }

  try {
    const color = await getColorHexRGB()
    console.log(`Captured color: ${color}`)
    clipboard.writeText(color)
    return color
  } catch (error) {
    console.warn('[ERROR] captureColor', error)
    return ''
  }
}

ipcMain.handle('capture-color', async () => {
  return captureColor()
})

ipcMain.handle('capture-page', async (_, rect) => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) throw new Error('No focused window found')

  try {
    const image = await win.webContents.capturePage(rect)
    clipboard.writeImage(image)
    const NOTIFICATION_TITLE = 'Imagem Capturada!'
    const NOTIFICATION_BODY = 'A imagem foi copiada para a área de transferência.'

    new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY
    }).show()
  } catch (err) {
    console.error('Erro ao capturar a página:', err)
    const ERROR_TITLE = 'Falha na Captura'
    const ERROR_BODY = 'Não foi possível capturar a imagem. Por favor, tente novamente.'

    new Notification({
      title: ERROR_TITLE,
      body: ERROR_BODY
    }).show()
  }
})

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minHeight: 600,
    minWidth: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  if (process.platform === 'win32') {
    app.setUserTasks([
      {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'Nova Janela',
        description: 'Crie uma nova janela do aplicativo'
      }
    ])
  }
}

function createNewWindow() {
  const newWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minHeight: 600,
    minWidth: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  newWindow.on('ready-to-show', () => {
    newWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    newWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  if (process.argv.includes('--new-window')) {
    createNewWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  if (process.platform === 'win32') {
    app.setUserTasks([])
  }
})
