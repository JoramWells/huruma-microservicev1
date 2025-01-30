/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Account_type = require('../_accounts/accountTypes.model');
const PatientDetails = require('./patientDetails.models');
const AccountingAccountDetails = require('../_accounts/accountingAccountDetails.model');

const PatientAccounts = sequelize.define('patient_accounts', {
  patient_account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // defaultValue: UUIDV4,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  account_type_id: {
    type: DataTypes.INTEGER,
  },
  reference_account_id: {
    type: DataTypes.INTEGER,
  },
});

PatientAccounts.belongsTo(PatientDetails, { foreignKey: 'patient_id' });
PatientAccounts.belongsTo(Account_type, { foreignKey: 'account_type_id' });
PatientAccounts.belongsTo(AccountingAccountDetails, { foreignKey: 'reference_account_id', targetKey: 'account_id' });

module.exports = PatientAccounts;
