/* eslint-disable camelcase */
const { DataTypes, STRING } = require('sequelize');
const sequelize = require('../../db/connect');
const Payroll_employee_category = require('./payrollEmployeeCategory.model');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const Payroll_periods = sequelize.define('payroll_periods', {
  payroll_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  pay_period_id: {
    type: DataTypes.INTEGER,
    primaryKey: STRING,
  },
  payroll_description: {
    type: DataTypes.STRING,
  },
  start_date: {
    type: DataTypes.STRING,
  },
  end_date: {
    type: DataTypes.STRING,
  },
  fiscal_month: {
    type: DataTypes.INTEGER,
  },
  fiscal_year: {
    type: DataTypes.INTEGER,
  },
  deduct_nssf: {
    type: DataTypes.STRING,
  },
  deduct_nhif: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  employee_category_id: {
    type: DataTypes.INTEGER,
  },

}, { timestamps: false });

Payroll_periods.belongsTo(Payroll_employee_category, { foreignKey: 'employee_category_id' })

module.exports = Payroll_periods
