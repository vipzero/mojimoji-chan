const path = require('path')

// メインプロセス
/** @type import('webpack').Configuration */
const main = {
	target: 'electron-main',
	mode: 'production',
	resolve: {
		extensions: ['.js', '.ts', '.json'],
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
	mode: 'production',
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
	plugins: [],
	devtool: 'inline-source-map',
}

module.exports = [main, app]
