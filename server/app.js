/*const express = require('express');
const router = require('./router.js');
const cors = require('cors');
const handlerError = require('./handlerError/handler');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(handlerError);

module.exports = app;*/

const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const handlerError = require('./handlerError/handler');

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/public', express.static('public'));
  app.use('/', router);
  app.use(handlerError);
  return app;
}

exports.createApp = createApp;

exports.app = createApp();
