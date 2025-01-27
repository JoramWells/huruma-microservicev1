/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const CashPaymentModes = sequelize.define('cash_payment_modes', {
  cash_payment_mode_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cash_payment_mode_description: {
    type: DataTypes.STRING,
  },
});
module.exports = CashPaymentModes;

// has no classification and status
