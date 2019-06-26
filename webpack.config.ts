const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist',
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},

	module: {
		rules: [
			{ test: /\.(js|tsx?)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{ test: /\.woff2?$/, loader: 'url-loader' },
		],
	},
	plugins: [new ForkTsCheckerWebpackPlugin({ tslint: true })],

	devServer: {
		contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
		compress: true,
		port: 9000,
	},
}
