const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FileLoader = require('file-loader');

module.exports = {
	entry: "./src/Index.js",
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'main.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json'  },
			{ test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract('css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap') },
			{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel',   query: {presets: ['es2015']}},
			{ test: /\.html$/, loader: 'html' },
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		})
	]
};
