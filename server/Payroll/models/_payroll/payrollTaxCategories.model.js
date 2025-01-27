/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const Payroll_tax_categories = sequelize.define('payroll_tax_categories', {
  tax_categories_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tax_category_description: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

module.exports = Payroll_tax_categories;
