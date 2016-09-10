const dev = require('react-devpack');

dev.startServer({
  port: 9000,
  proxy: 'http://localhost:3000/api',
});
