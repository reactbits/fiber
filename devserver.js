process.env.UV_THREADPOOL_SIZE = 100;

const express = require('express');
const got = require('got');
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

app.get('/uiface/random', function(req, res) {
	res.header('Content-Type', 'application/json');
  got.stream('http://uifaces.com/api/v1/random').pipe(res);
});

app.get('/jokes/random', function(req, res) {
	res.header('Content-Type', 'application/json');
	got.stream('http://api.icndb.com/jokes/random').pipe(res);
});

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://0.0.0.0:%s', port);
});
