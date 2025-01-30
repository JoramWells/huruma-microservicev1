/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const ProcedureItem = require('./procedureItems.model');

const Procedure_item_result = sequelize.define('procedure_item_results', {
  procedure_item_result_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
  },
  procedure_item_id: {
    type: DataTypes.INTEGER,
  },
  input: {
    type: DataTypes.STRING,
  },
  normal_values: {
    type: DataTypes.STRING,
  },
  flag: {
    type: DataTypes.STRING,
  },
  microscopy: {
    type: DataTypes.STRING,
  },
  lab_request_id: {
    type: DataTypes.INTEGER,
  },
  procedure_item_checked_value: {
    type: DataTypes.STRING,
  },
  procedure_items_conclusion_id: {
    type: DataTypes.INTEGER,
  },
  procedure_items_conclusion_description: {
    type: DataTypes.STRING,
  },
});

Procedure_item_result.belongsTo(ProcedureItem, { foreignKey: 'procedure_item_id' });


module.exports = Procedure_item_result;
