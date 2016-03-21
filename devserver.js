const startServer = require('react-devpack').startServer;

const port = 8000 || process.env.PORT;

function extendApp(app) {
	// proxying of api requests
	const makeProxy = require('apiproxy');
	app.all('/api/*', makeProxy({ port: 3000, serverPort: port }));
}

startServer({
	port: port, // eslint-disable-line
	extendApp: extendApp, // eslint-disable-line
});
