const express = require('express');
const router = require('./router');
const cors = require('cors');
const handlerError = require('./handlerError/handler');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(handlerError);

module.exports = app;
