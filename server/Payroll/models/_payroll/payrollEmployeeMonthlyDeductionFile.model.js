/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Payroll_employee_record = require('./payrollEmployeeRecords.model');
const Payroll_deduction = require('./payrollDeductions.model');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const Payroll_employee_monthly_deductions_file = sequelize.define('payroll_employee_monthly_deductions_file', {
  monthly_deduction_file_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  payroll_id: {
    type: DataTypes.INTEGER,
  },
  employee_id: {
    type: DataTypes.INTEGER,
  },
  deduction_id: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
}, { timestamps: false });

Payroll_employee_monthly_deductions_file.belongsTo(Payroll_employee_record, { foreignKey: 'employee_id' });
Payroll_employee_monthly_deductions_file.belongsTo(Payroll_deduction, { foreignKey: 'deduction_id' });

module.exports = Payroll_employee_monthly_deductions_file;
