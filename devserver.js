const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');

const config = require('./webpack.config');
const port = 7000;
const app = express();
const compiler = webpack(config);

app.use(morgan('dev'));

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	stats: {
		colors: true,
	},
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(process.cwd()));

// proxying of api requests
const makeProxy = require('apiproxy');
app.all('/api/*', makeProxy({ port: 3000, serverPort: port }));

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://0.0.0.0:%s', port);
});
