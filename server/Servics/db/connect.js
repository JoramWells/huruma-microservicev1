const Sequelize = require('sequelize');

// setting up sequelize

const DB = 'huruma2';
const USERNAME = 'postgres';
const PASSWORD = 'postgres';

const connect = new Sequelize(
  DB,
  USERNAME,
  PASSWORD,
  {
    host: 'database',
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true,

    },
  },

);

module.exports = connect;
