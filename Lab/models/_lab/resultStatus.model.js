/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const ResultStatus = sequelize.define('results_status', {
  results_status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  results_status_description: {
    type: DataTypes.STRING,
  },

});

module.exports = ResultStatus;
