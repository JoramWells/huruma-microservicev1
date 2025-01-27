/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Users = require('../user/user.model');
const ServiceType = require('../_accounts/serviceTypes.model');
const CashPaymentModes = require('../_accounts/cashPaymentModes.model');

const InvoicePayments = sequelize.define('invoice_payments', {
  invoice_payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  invoice_no: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  cheque_no: {
    type: DataTypes.INTEGER,
  },
  date_of_payment: {
    type: DataTypes.STRING,
  },
  time_of_payment: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  service_type_id: {
    type: DataTypes.INTEGER,
  },
  service_id: {
    type: DataTypes.INTEGER,
  },
  service_desc: {
    type: DataTypes.STRING,
  },
  bank_account_id: {
    type: DataTypes.INTEGER,
  },
  cash_payment_mode_id: {
    type: DataTypes.INTEGER,
  },
  invoice_payment_receipt_no: {
    type: DataTypes.STRING,
  },
  insurance_id: {
    type: DataTypes.INTEGER,
  },
  withholding_tax_percentage: {
    type: DataTypes.INTEGER,
  },
  withholding_tax_amount: {
    type: DataTypes.INTEGER,
  },
  // transaction_charges_payment: {
  //   type: DataTypes.INTEGER,
  // },
  transaction_charges_amount: {
    type: DataTypes.INTEGER,
  },
  cleared: {
    type: DataTypes.STRING,
  },
  cleared_by: {
    type: DataTypes.INTEGER,
  },
  total_amount_allocated_to_invoices: {
    type: DataTypes.INTEGER,
  },
  insurance_name_invoice_payments: {
    type: DataTypes.STRING,
  },
});

InvoicePayments.belongsTo(Users, { foreignKey: 'user_id' });
InvoicePayments.belongsTo(ServiceType, { foreignKey: 'service_type_id' });
InvoicePayments.belongsTo(CashPaymentModes, { foreignKey: 'cash_payment_mode_id' });
// InvoicePayments.belongsTo(InvoicePaymentstatus, { foreignKey: 'asset_status_id' });

module.exports = InvoicePayments;

// has no classification and status
