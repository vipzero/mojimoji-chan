const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin')

const [mainBase, appBase] = require('./webpack.config')

const electronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
	path: './',
})

/** @type import('webpack').Configuration */
const main = {
	...mainBase,
	mode: 'development',
	plugins: mainBase.plugins.concat([electronReloadWebpackPlugin()]),
}

const app = {
	...appBase,
	mode: 'development',
	plugins: appBase.plugins.concat([electronReloadWebpackPlugin()]),
}

module.exports = [main, app]
