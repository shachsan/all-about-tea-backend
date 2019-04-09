const http=require('http');
const serverSetup = require('./config/server-setup');
const app=require('./app');
const port=serverSetup.portEnv || serverSetup.portCustom;

const server=http.createServer(app)

server.listen(port, () => console.log(`listening on http://localhost:${port}`));
