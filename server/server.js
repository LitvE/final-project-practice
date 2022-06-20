const { app } = require('./app.js');
const http = require('http');
require('./db/models/mongoModels/index');
const controller = require('./socketInit');
const {jobToSchedule} = require('./utils/schedule');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
controller.createConnection(server);

jobToSchedule();
 