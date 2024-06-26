/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Database and sequelize configurations
 * @lastUpdated: Mar 29, 2023
 */

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const envConfigs = require("../../config/db");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = envConfigs[env];
const db = {};

//create a sequelize instance with credentials
let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
