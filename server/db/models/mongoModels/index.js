const mongoose = require('mongoose');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../../', 'config/mongoConfig.json');
const config = require(configPath)[env];
const fs = require('fs');

mongoose.connect(
  `mongodb://${config.host}:${config.port}/${config.database}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  },
);

mongoose.set('debug', env === 'development');
//mongoose.set('useCreateIndex', true);

const db = {};

const basename = path.basename(__filename);
/*const ModelsRegExp = /^[^.].*?\.js$/;

fs.readdirSync(__dirname)
  .filter((file) => ModelsRegExp.test(file) && file !== basename)
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });*/

  fs.readdirSync(__dirname)
  .filter((fileName) => {
    return (
        fileName.indexOf('.') !== 0) 
                && (fileName !== basename) 
                && (fileName.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });


db.mongoose = mongoose;

module.exports = db;
