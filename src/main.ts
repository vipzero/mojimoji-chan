import fs from 'fs'
import { client } from 'electron-connect'
import { app, BrowserWindow, ipcMain } from 'electron'

import { watchSmart } from 'chch/dist/watch'
import _ from 'lodash'

let mainWindow: Electron.BrowserWindow | null

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		frame: true,
		height: 600,
		webPreferences: {
			// preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			// webSecurity: false,
		},
		width: 800,
	})

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	client.create(mainWindow)

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// NOTE: state 管理これでいいのか？
const state: { watcher: ReturnType<typeof watchSmart> | null } = {
	watcher: null,
}

ipcMain.on('watch', async (event, url) => {
	console.log('main -- watch')
	if (state.watcher) {
		state.watcher.stop()
	}
	// const data = fs.readFileSync('out.txt', 'utf-8')
	// const posts: Post[] = JSON.parse(data)
	// event.sender.send('posts', posts, 0)
	state.watcher = await watchSmart(url, ({ newPosts, nthCall }) => {
		const lastPost = _.last(newPosts)

		if (lastPost && state.watcher && lastPost.number >= 1000) {
			state.watcher.stop()
		}

		event.sender.send('posts', newPosts, nthCall)
	})
	state.watcher.start()
})

ipcMain.on('unwatch', async () => {
	console.log('main -- unwatch')
	if (state.watcher) {
		state.watcher.stop()
	}
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
