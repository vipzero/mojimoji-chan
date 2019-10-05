const path = require('path')

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
	plugins: [],
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
			{
				// iconv-lite で Uncaught TypeError: __webpack_require__
				test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
				resolve: {
					aliasFields: ['main'],
				},
			},
		],
	},
	plugins: [],
	devtool: 'inline-source-map',
}

module.exports = [main, app]
