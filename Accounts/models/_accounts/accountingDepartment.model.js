/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const AccountingDepartment = sequelize.define('accounting_cost_centres', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  department_name: {
    type: DataTypes.STRING,
  },
  associated_hospital_store_id: {
    type: DataTypes.INTEGER,
  },
});


module.exports = AccountingDepartment;

// has no classification and status
