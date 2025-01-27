/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const Payroll_tax_status = sequelize.define('payroll_tax_status', {
  tax_status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tax_status_description: {
    type: DataTypes.STRING,
  },
  personal_exemption: {
    type: DataTypes.INTEGER,
  },
  additional_exemption: {
    type: DataTypes.INTEGER,
  },

}, { timestamps: false });

module.exports = Payroll_tax_status;
