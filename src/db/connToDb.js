require('dotenv').config();
const Sequelize = require('sequelize');
const logger = require('../logger')

module.exports = con = {};

const config = {

   database: {
    host: process.env.DB_host,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
}


const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'postgres',
  logging: msg => logger.info(msg),
  dialectOptions: {
    multipleStatements: true
  },
  timezone:"+05:30"
});

const initModels = require('../models/init-models')
const models = initModels(sequelize);

con.sequelize = sequelize;
module.exports.models = models;


sequelize.authenticate()
  .then(() => {
    //  sequelize.sync();
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
