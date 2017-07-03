var path = require('path');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}
		]
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public')
	}
};
