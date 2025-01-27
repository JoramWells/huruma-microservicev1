/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Payroll_employee_record = require('./payrollEmployeeRecords.model');
const Payroll_periods = require('./payrollPeriods.model');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const PayrollEmployeeTaxFile = sequelize.define('payrollEmployeeTaxFile', {
  tax_file_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  payroll_id: {
    type: DataTypes.INTEGER,
  },

  employee_id: {
    type: DataTypes.INTEGER,
  },
  taxable_income: {
    type: DataTypes.INTEGER,
  },
  tax_amount: {
    type: DataTypes.INTEGER,
  },
  fiscal_month: {
    type: DataTypes.INTEGER,
  },
  fiscal_year: {
    type: DataTypes.INTEGER,
  },
}, { timestamps: false });

PayrollEmployeeTaxFile.belongsTo(Payroll_employee_record, { foreignKey: 'employee_id' });
PayrollEmployeeTaxFile.belongsTo(Payroll_periods, { foreignKey: 'payroll_id' });


module.exports = PayrollEmployeeTaxFile;
