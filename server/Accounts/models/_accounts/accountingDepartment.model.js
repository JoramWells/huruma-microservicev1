/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const HospitalStores = require('../hospital/hospitalStores.model');

const AccountingDepartment = sequelize.define('accounting_departments', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  department_name: {
    type: DataTypes.STRING,
  },
  associated_hospital_store_id: {
    type: DataTypes.STRING,
  },
});

AccountingDepartment.belongsTo(HospitalStores, { foreignKey: 'associated_hospital_store_id' });

module.exports = AccountingDepartment;

// has no classification and status
