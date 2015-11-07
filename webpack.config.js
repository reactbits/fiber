const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./demo/index',
	],
	output: {
		path: path.join(__dirname, 'demo'),
		filename: 'bundle.js',
		publicPath: '/demo/',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
	module: {
		loaders: [
			{test: /\.json$/, loader: 'json'},
			{test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules', 'demo', 'src'],
	},
};
