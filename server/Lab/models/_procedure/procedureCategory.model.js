const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const ServiceType = require('../services/serviceType.model');

const ProcedureCategory = sequelize.define('procedure_categories', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  service_type_id: {
    type: DataTypes.INTEGER,
  },
  credit_account_id: {
    type: DataTypes.INTEGER,
  },
});

ProcedureCategory.belongsTo(ServiceType, { foreignKey: 'service_type_id' })

module.exports = ProcedureCategory;
