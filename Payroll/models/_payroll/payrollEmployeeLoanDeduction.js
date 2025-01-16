/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Payroll_periods = require('./payrollPeriods.model');
const Payroll_employee_loan_record = require('./payrollEmployeeLoanRecord.model.js');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const Payroll_employee_loan_deduction = sequelize.define('payroll_employee_loan_deduction', {
  loan_deduction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  payroll_id: {
    type: DataTypes.INTEGER,
  },
  employee_id: {
    type: DataTypes.INTEGER,
  },
  loan_id: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  amount_plus_interest: {
    type: DataTypes.INTEGER,
  },
}, { timestamps: false });

Payroll_employee_loan_deduction.belongsTo(Payroll_periods, { foreignKey: 'payroll_id' });
Payroll_employee_loan_deduction.belongsTo(Payroll_employee_loan_record, { foreignKey: 'loan_id' });


module.exports = Payroll_employee_loan_deduction;
