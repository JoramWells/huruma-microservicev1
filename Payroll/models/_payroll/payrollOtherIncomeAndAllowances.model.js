/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const PayrollOtherIncomeAndAllowances = sequelize.define('payroll_other_income_and_allowances', {
  other_income_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  other_income_description: {
    type: DataTypes.STRING,
  },

  taxable_state_id: {
    type: DataTypes.INTEGER,
  },
  benefit_type_id: {
    type: DataTypes.INTEGER,
  },
}, { timestamps: false });

module.exports = PayrollOtherIncomeAndAllowances;
