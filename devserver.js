const express = require('express');
const morgan = require('morgan');
const got = require('got');
const webpack = require('webpack');

const config = require('./webpack.config');
const port = 7000;
const app = express();
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(express.static(process.cwd()));

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
	},
}));

app.use(require('webpack-hot-middleware')(compiler));

function proxy(path, url) {
	app.get(path, function (req, res) {
		res.header('Content-Type', 'application/json');
		got.stream(url)
			.on('error', err => {
				console.log(err);
			})
			.pipe(res);
	});
}

proxy('/randomface', 'http://uifaces.com/api/v1/random');
proxy('/randomuser', 'https://randomuser.me/api/');
proxy('/jokes/random', 'http://api.icndb.com/jokes/random');

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://0.0.0.0:%s', port);
});
