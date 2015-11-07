process.env.UV_THREADPOOL_SIZE = 100;

const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const port = 8000;
const app = express();
const compiler = webpack(config);

app.use(express.static(process.cwd()));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://0.0.0.0:%s', port);
});
