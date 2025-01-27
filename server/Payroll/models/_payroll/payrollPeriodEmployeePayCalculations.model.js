/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Payroll_employee_record = require('./payrollEmployeeRecords.model');
const Payroll_deduction = require('./payrollDeductions.model');
// const Payroll_taxable_state = require('./payrollTaxableStatus.model');

const PayrollPeriodEmployeePayCalculations = sequelize.define('payroll_period_employee_pay_calculations', {
  payroll_period_employee_pay_calculation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  payroll_id: {
    type: DataTypes.STRING,
  },
  employee_id: {
    type: DataTypes.STRING,
  },
  department_id: {
    type: DataTypes.STRING,
  },
  job_title_id: {
    type: DataTypes.STRING,
  },
  employment_status_id: {
    type: DataTypes.STRING,
  },
  job_number: {
    type: DataTypes.STRING,
  },
  regular_hours: {
    type: DataTypes.STRING,
  },
  absent_hours: {
    type: DataTypes.STRING,
  },
  late_hours: {
    type: DataTypes.STRING,
  },
  period_rate: {
    type: DataTypes.STRING,
  },
  hourly_rate: {
    type: DataTypes.STRING,
  },
  basic_pay: {
    type: DataTypes.STRING,
  },
  other_income_total_amount: {
    type: DataTypes.STRING,
  },
  earnings_total_amount: {
    type: DataTypes.STRING,
  },
  absent_total_amount: {
    type: DataTypes.STRING,
  },

  late_total_amount: {
    type: DataTypes.STRING,
  },
  overtime_total_amount: {
    type: DataTypes.STRING,
  },
  gross_pay: {
    type: DataTypes.STRING,
  },
  gross_taxable: {
    type: DataTypes.STRING,
  },
  nssf_amount: {
    type: DataTypes.STRING,
  },
  taxable_pay: {
    type: DataTypes.STRING,
  },
  tax_amount: {
    type: DataTypes.INTEGER,
  },
  gross_pay_after_tax: {
    type: DataTypes.INTEGER,
  },
  advance_pay: {
    type: DataTypes.STRING,
  },
  nhif_amount: {
    type: DataTypes.STRING,
  },
  loan_deduction_amount: {
    type: DataTypes.STRING,
  },
  fringe_benefit_tax_amount: {
    type: DataTypes.STRING,
  },
  net_pay: {
    type: DataTypes.STRING,
  },
  employee_category_id: {
    type: DataTypes.STRING,
  },
  monthly_deductions_total_amount_taxable: {
    type: DataTypes.STRING,
  },
  monthly_deductions_total_amount_non_taxable: {
    type: DataTypes.STRING,
  },
  deductions_total_amount_taxable: {
    type: DataTypes.STRING,
  },
  deductions_total_amount_non_taxable: {
    type: DataTypes.STRING,
  },
  pension_amount_taxable: {
    type: DataTypes.STRING,
  },
  pension_amount_non_taxable: {
    type: DataTypes.STRING,
  },
  quarters_value_amount: {
    type: DataTypes.STRING,
  },
  kudheiha_amount: {
    type: DataTypes.STRING,
  },
  long_service_pay_amount: {
    type: DataTypes.STRING,
  },
  personal_relief: {
    type: DataTypes.STRING,
  },
  directorate_of_industrial_training_amount: {
    type: DataTypes.STRING,
  },
  bank_id: {
    type: DataTypes.STRING,
  },
  bank_branch: {
    type: DataTypes.STRING,
  },
  branch_code: {
    type: DataTypes.STRING,
  },
  bank_account_number: {
    type: DataTypes.STRING,
  },
  insurance_relief: {
    type: DataTypes.STRING,
  },
  tax_category_id: {
    type: DataTypes.STRING,
  },
  nhif_relief: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

PayrollPeriodEmployeePayCalculations.belongsTo(Payroll_employee_record, { foreignKey: 'employee_id' })
// PayrollPeriodEmployeePayCalculations.belongsTo(Payroll_deduction, { foreignKey: 'deduction_id' })


module.exports = PayrollPeriodEmployeePayCalculations;
