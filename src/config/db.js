require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: 'postgres',
    modelsDir: '../database/models'
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    logging: false,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: 'postgres'
  }
};
