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
