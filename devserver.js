const dev = require('react-devpack');
const proxyMiddleware = require('http-proxy-middleware');

dev.startServer({
	extendApp(app) {
		app.use(proxyMiddleware('http://localhost:3000/api'));
	},
});
