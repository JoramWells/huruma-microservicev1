/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Payroll_employee_record = require('./payrollEmployeeRecords.model');
const Payroll_periods = require('./payrollPeriods.model');
const PayrollOtherIncomeAndAllowances = require('./payrollOtherIncomeAndAllowances.model');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const Payroll_employee_benefits_file = sequelize.define('payroll_employee_benefits_file', {
  employee_benefits_file_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  payroll_id: {
    type: DataTypes.INTEGER,
  },
  employee_id: {
    type: DataTypes.INTEGER,
  },
  other_income_type_id: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
  },

}, { timestamps: false });

Payroll_employee_benefits_file.belongsTo(Payroll_employee_record, { foreignKey: 'employee_id' });
Payroll_employee_benefits_file.belongsTo(Payroll_periods, { foreignKey: 'payroll_id' });
Payroll_employee_benefits_file.belongsTo(PayrollOtherIncomeAndAllowances, { foreignKey: 'other_income_type_id', targetKey: 'other_income_id' });

module.exports = Payroll_employee_benefits_file;
