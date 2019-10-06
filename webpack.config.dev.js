const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin')

const [mainBase, appBase] = require('./webpack.config')

const electronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
	path: './',
})

/** @type import('webpack').Configuration */
const main = {
	...mainBase,
	plugins: mainBase.plugins.concat([electronReloadWebpackPlugin()]),
}

const app = {
	...appBase,
	plugins: appBase.plugins.concat([electronReloadWebpackPlugin()]),
}

module.exports = [main, app]
