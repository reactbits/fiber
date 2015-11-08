const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./demo/index',
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/',
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.scss'],
	},
	module: {
		loaders: [
			{test: /\.json$/, loader: 'json'},
			{test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
			{
				test: /(\.scss|\.css)$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap'),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('styles.css', { allChunks: true }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
			},
		}),
	],
	postcss: [autoprefixer],
};
