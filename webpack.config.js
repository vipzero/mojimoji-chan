const path = require('path')

// プラグインのインポート
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin')

// プロジェクト直下のディレクトリを監視させる
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
	path: './',
})

// メインプロセス
/** 補完が効きます！ */
/** @type import('webpack').Configuration */
const main = {
	target: 'electron-main',
	mode: 'development',
	resolve: {
		extensions: ['.js', '.ts'],
	},
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	// プラグイン起動
	plugins: [ElectronReloadWebpackPlugin()],
	devtool: 'inline-source-map',
}

// レンダラープロセス
/** @type import('webpack').Configuration */
const app = {
	target: 'electron-renderer',
	mode: 'development',
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx'],
	},
	entry: './src/renderer.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	plugins: [ElectronReloadWebpackPlugin()],
	devtool: 'inline-source-map',
}

module.exports = [main, app]
