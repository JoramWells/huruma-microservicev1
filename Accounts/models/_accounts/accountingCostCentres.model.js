/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const AccountingAccountDetails = require('./accountingAccountDetails.model');

const AccountingCostCentres = sequelize.define('accounting_cost_centres', {
  cost_centre_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cost_centre_description: {
    type: DataTypes.INTEGER,
  },
  department_id: {
    type: DataTypes.INTEGER,
  },
});

AccountingCostCentres.belongsTo(AccountingAccountDetails,{foreignKey:'account_id'})

module.exports = AccountingCostCentres;

// has no classification and status
