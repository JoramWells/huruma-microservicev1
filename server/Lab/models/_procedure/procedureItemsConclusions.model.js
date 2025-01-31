const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Procedure_detail = require('./procedureDetails.model');

const ProcedureItemsConclusions = sequelize.define('procedure_items_conclusions', {
  procedure_items_conclusion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  procedure_items_conclusion_description: {
    type: DataTypes.STRING,
  },
  procedure_id: {
    type: DataTypes.INTEGER,
  },
});

ProcedureItemsConclusions.belongsTo(Procedure_detail, { foreignKey: 'procedure_id' })

module.exports = ProcedureItemsConclusions;
