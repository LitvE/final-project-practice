const mongoose = require('mongoose');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
const config = require(configPath)[ env ];
const fs = require('fs');

mongoose.connect(
  `mongodb://${ config.host }:${ config.port }/${ config.database }`,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

  });

mongoose.set('debug', env === 'development');
const db = {};

const basename = path.basename(__filename);
const ModelRegExp = /^[^.].*?\.js$/;

fs.readdirSync(__dirname).filter(file => ModelRegExp.test(file) && file !== basename).forEach((file) => {
  const model = require(path.join(__dirname, file));
  db[model.modelName] = model;
});

db.mongoose = mongoose;

module.exports = mongoose;
