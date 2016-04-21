const dev = require('react-devpack');

dev.startServer({
	proxy: 'http://localhost:3000/api',
});
