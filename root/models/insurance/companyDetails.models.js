/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const CompanyDetails = sequelize.define('company_details', {
  company_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  company_name: {
    type: DataTypes.STRING,
  },
  insurance_limit_type_id: {
    type: DataTypes.INTEGER,
  },
  maximum_billable_amount: {
    type: DataTypes.INTEGER,
  },
  payment_percentage_out_patient: {
    type: DataTypes.INTEGER,
  },
  payment_percentage_in_patient: {
    type: DataTypes.INTEGER,
  },
  revenue_expected: {
    type: DataTypes.INTEGER,
  },
});
module.exports = CompanyDetails;

// has no classification and status
